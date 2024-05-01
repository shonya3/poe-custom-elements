import { elementalBow } from './../jsons/elementalBow';
import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { PoeItem } from './poe.types';
import './elements/poe-item';
import './elements/poe-stash-tab';
import './elements/item-info/poe-item-info';
import './elements/item-info/poe-item-info-header';
import { TabWithItems } from './poe.types';
import quadJson from '../jsons/QuadStash.json';
import premJson from '../jsons/PremiumStash.json';
import aTabJson from '../jsons/a.json';
import influenceJson from '../jsons/influence.json';
import garbageJson from '../jsons/garbage.json';

declare global {
	interface HTMLElementTagNameMap {
		'app-root': AppRoot;
	}
}

@customElement('app-root')
export class AppRoot extends LitElement {
	@state() quad = quadJson as TabWithItems;
	@state() prem = premJson as TabWithItems;
	@state() aTab = aTabJson as unknown as TabWithItems;
	@state() item = item();
	@state() influenceTab = influenceJson as TabWithItems;
	@state() garbageTab = garbageJson as TabWithItems;

	protected render(): TemplateResult {
		return html`
			<poe-item-info
				.item=${{
					baseType: 'Breach Ring',
					corrupted: true,
					frameType: 2,
					h: 1,
					icon: 'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvUmluZ3MvQnJlYWNoUmluZyIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/c21b912df7/BreachRing.png',
					id: '7788388f29e96638ff676b29f2cc4c37843e8218f010da07d310a3c8fe511be6',
					identified: false,
					ilvl: 66,
					implicitMods: ['Properties are doubled while in a Breach'],
					inventoryId: 'Stash1',
					league: 'Hardcore Necropolis',
					name: '',
					rarity: 'Rare',
					typeLine: 'Breach Ring',
					verified: false,
					w: 1,
					x: 14,
					y: 14,
				} as PoeItem}
			></poe-item-info>
			${this.Tabs()}
			<poe-item .item=${this.aTab.items!.find(i => i.baseType === 'Plated Maul')!}></poe-item>
		`;
	}

	protected render2(): TemplateResult {
		return html`
			<poe-item .item=${this.aTab.items!.find(i => i.baseType === 'Plated Maul')!}></poe-item>
			<poe-item-info .item=${elementalBow}></poe-item-info>
			<poe-item-info .item=${this.aTab.items!.find(i => i.baseType === 'Plated Maul')!}></poe-item-info>
		`;
	}

	protected Tabs(): TemplateResult {
		return html`
			<div style="display:flex; flex-wrap:wrap; gap:0.5rem">
				<poe-stash-tab .tab=${this.quad}></poe-stash-tab>
				<poe-stash-tab style="margin-top: 2px" .tab=${this.prem}></poe-stash-tab>
				<poe-stash-tab .tab=${this.influenceTab}></poe-stash-tab>
				<poe-stash-tab .tab=${this.garbageTab}></poe-stash-tab>
			</div>
		`;
	}

	static styles = css`
		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}
	`;
}

function item(): PoeItem {
	return {
		baseType: 'Glorious Leather',
		explicitMods: [
			'+13% chance to Suppress Spell Damage',
			'+100 to Evasion Rating',
			'+77 to maximum Life',
			'+28% to Fire Resistance',
			'+39% to Lightning Resistance',
		],
		frameType: 2,
		h: 3,
		icon: 'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9Cb2R5QXJtb3Vycy9Cb2R5RGV4MUMiLCJ3IjoyLCJoIjozLCJzY2FsZSI6MX1d/47360dcc4a/BodyDex1C.png',
		id: 'd30b5d8f1b66c43e24051760aff4afc71b1e00f21b299baffeb7b7394fef6575',
		identified: true,
		ilvl: 62,
		inventoryId: 'Stash1',
		league: 'Hardcore Necropolis',
		name: 'Empyrean Shelter',
		properties: [
			{
				displayMode: 0,
				name: 'Evasion Rating',
				type: 17,
				values: [['617', 1]],
			},
		],
		rarity: 'Rare',
		requirements: [
			{
				displayMode: 0,
				name: 'Level',
				type: 62,
				values: [['48', 0]],
			},
			{
				displayMode: 1,
				name: 'Dex',
				type: 64,
				values: [['124', 0]],
			},
		],
		socketedItems: [],
		sockets: [
			{
				attr: 'S',
				group: 0,
				sColour: 'R',
			},
			{
				attr: 'S',
				group: 0,
				sColour: 'R',
			},
			{
				attr: 'I',
				group: 1,
				sColour: 'B',
			},
			{
				attr: 'D',
				group: 1,
				sColour: 'G',
			},
			{
				attr: 'D',
				group: 2,
				sColour: 'G',
			},
			{
				attr: 'D',
				group: 2,
				sColour: 'G',
			},
		],
		typeLine: 'Glorious Leather',
		verified: false,
		w: 2,
		x: 22,
		y: 12,
	} as PoeItem;
}
