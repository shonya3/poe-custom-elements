import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';
import sharp from 'sharp';

const ROOT_DIR = path.resolve(import.meta.dirname, '..');
const POE_CDN_CARDS = 'https://web.poecdn.com/image/divination-card';
const IMAGES_DIR_0 = path.join(import.meta.dirname, 'public/images');
const IMAGES_DIR = path.join(ROOT_DIR, 'public/poe-ce-assets/divination-card/cards/avif');

async function main() {
	if (!fs.existsSync(IMAGES_DIR)) {
		await fsPromises.mkdir(IMAGES_DIR, { recursive: true });
	}

	const poeninja_cards = await fetch_poeninja_cards_data();
	poeninja_cards.forEach(download_poecdn_image);
}
main();

type CardData = {
	name: string;
	artFilename: string;
};

async function fetch_poeninja_cards_data(): Promise<Array<CardData>> {
	const url = 'https://poe.ninja/api/data/itemoverview?league=Standard&type=DivinationCard&language=en';
	const response = await fetch(url);
	const obj: { lines: Array<CardData> } = await response.json();
	const cards = obj.lines;
	if (!cards.some(c => c.name === `Father's Love`)) {
		cards.push({ name: `Father's Love`, artFilename: 'FathersLove' });
	}

	return cards;
}

async function download_poecdn_image(card: CardData): Promise<void> {
	const url = `${POE_CDN_CARDS}/${card.artFilename}.png`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Could not download card. Code: ${response.status}`);
	}

	const image_path = path.join(IMAGES_DIR, `${card.artFilename}.avif`);
	const to_avif = sharp().avif();
	const write_file_stream = fs.createWriteStream(image_path, { flags: 'w' });
	//@ts-expect-error
	Readable.fromWeb(response.body).pipe(to_avif).pipe(write_file_stream);
}
