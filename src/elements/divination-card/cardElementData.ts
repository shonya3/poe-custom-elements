import json from './cardElementData.json';
export const cardElementData: CardElementData[] = json;

/**
 * https://github.com/shonya3/divicards/tree/main/card_element
 */
export type CardElementData = {
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
