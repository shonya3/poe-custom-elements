import json from './cardElementData.json';
export const cardElementData: CardElementData[] = json;

/**
 * https://github.com/shonya3/divicards/tree/main/card_element
 */
export type CardElementData = {
	slug: string;
	name: string;
	artFilename: string;
	flavourText: string;
	stackSize: number | null;
	rewardHtml: string;
	dropLevel: DropLevel;
};

export type DropLevel = {
	level: { min: number | null; max: number | null };
	label: string;
};

export function findCardBySlug(slug: string): CardElementData | null {
	return cardElementData.find(card => card.slug === slug) ?? null;
}
