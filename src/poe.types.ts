export interface TabWithItems extends NoItemsTab {
	items: PoeItem[];
}

export interface NoItemsTab {
	id: string;
	index: number;
	name: string;
	type: StashType;
	folder?: string;
	metadata?: Metadata;
	children?: NoItemsTab[];
	parent?: string;
}

export type StashType =
	| 'PremiumStash'
	| 'CurrencyStash'
	| 'MapStash'
	| 'QuadStash'
	| 'FragmentStash'
	| 'EssenceStash'
	| 'BlightStash'
	| 'Folder'
	| 'NormalStash'
	| string;

export interface Metadata {
	colour?: string;
	public?: boolean;
	folder?: boolean;
	items?: boolean;
	map?: {
		series?: number;
	};
}

export type ItemProperty = {
	name: string;
	values: Array<[string, number]>;
	displayMode: number;
	progress?: number;
	type?: number;
};

export type Requirement = {
	name: string;
	values: Array<[string, number]>;
	displayMode: number;
	type?: number;
};

export interface Socket {
	group: number;
	attr: string;
	sColour: SocketKind;
}

export const SOCKET_KINDS = ['R', 'G', 'B', 'A'] as const;
export type SocketKind = (typeof SOCKET_KINDS)[number];
export type GemKind = 'support' | 'active';

export interface ICategory {
	gems: Array<string>;
	jewels: Array<string>;
}

/** PoE API item data https://www.pathofexile.com/developer/docs/reference#stashes-get */
export type PoeItem = {
	/** Monster level. Appears on allflames */
	itemLevel?: number;
	id: string;
	name: string;
	verified: boolean;
	inventoryId: string;
	frameType: number;
	x: number;
	y: number;
	w: number;
	h: number;
	rarity?: ItemRarity;
	ilvl: number;
	icon: string;
	league: string;
	sockets?: Array<Socket>;
	shaper?: boolean;
	elder?: boolean;
	baseType: string;
	fractured?: boolean;
	synthesised?: boolean;
	typeLine: string;
	identified: boolean;
	corrupted?: boolean;
	lockedToCharacter?: boolean;
	requirements?: Array<Requirement>;
	implicitMods?: Array<string>;
	explicitMods?: Array<string>;
	fracturedMods?: Array<string>;
	socketedItems?: Array<SocketedItem>;
	properties?: Array<ItemProperty>;
	flavourText?: Array<string>;
	craftedMods?: Array<string>;
	enchantMods?: Array<string>;
	utilityMods?: Array<string>;
	descrText?: string;
	prophecyText?: string;
	socket?: number;
	stackSize?: number;
	maxStackSize?: number;
};

export interface SocketedItem {
	id: string;
	verified: boolean;
	w: number;
	h: number;
	ilvl: number;
	icon: string;
	name: string;
	typeLine: string;
	corrupted?: boolean;
	lockedToCharacter?: boolean;
	category?: ICategory;
	requirements: Array<Requirement>;
	nextLevelRequirements?: Array<Requirement>;
	explicitMods: Array<string>;
	frameType: number;
	x?: number;
	y?: number;
	properties: Array<ItemProperty>;
	additionalProperties?: Array<ItemProperty>;
	descrText: string;
	secDescrText: string;
	socket: number;
}

export const RARITY_VARIANTS = ['Normal', 'Magic', 'Rare', 'Unique'] as const;
export type ItemRarity = (typeof RARITY_VARIANTS)[number];
