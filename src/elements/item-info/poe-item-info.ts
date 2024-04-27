import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PoeItem } from '../../poe.types';
import { classMap } from 'lit/directives/class-map.js';

declare global {
	interface HTMLElementTagNameMap {
		'poe-item-info': PoeItemInfoElement;
	}
}

@customElement('poe-item-info')
export class PoeItemInfoElement extends LitElement {
	/** PoE API item data https://www.pathofexile.com/developer/docs/reference#stashes-get */
	@property({ type: Object }) item!: PoeItem;

	protected render(): TemplateResult {
		const typeHead = typeHeader(this.item);

		if (!this.item) {
			return html`<p style="color: red">No Poe Api item data (.item)</p>`;
		}

		return html`<header
			class=${classMap({
				header: true,
				'header--single': typeHead === 'single',
				'header--double': typeHead === 'double',
			})}
			style="background: ${headerBackgroundUrl(this.item)}"
		></header>`;
	}

	static styles = css`
		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}
		:host {
			--header-single-height: 27px;
			display: block;
		}

		.header {
			background-color: red;
		}

		.header--single {
			height: var(--header-single-height);
		}

		.header--double {
			height: calc(2 * var(--header-single-height));
		}
	`;
}

function headerAssetUrl(
	size: 'single' | 'double',
	rarity: string,
	side: 'left' | 'middle' | 'right',
	url = '/poe-images/'
): string {
	return `${url}header-${size === 'double' ? 'double' : ''}-${rarity.toLowerCase()}-${side}.png`;
}

function headerBackgroundUrl(item: PoeItem): string {
	const left = `url(${headerAssetUrl(typeHeader(item), item.rarity, 'left')}) top left no-repeat`;
	const right = `url(${headerAssetUrl(typeHeader(item), item.rarity, 'right')}) top right no-repeat`;
	const mid = `url(${headerAssetUrl(typeHeader(item), item.rarity, 'middle')}) top center`;
	return `${left},${right},${mid}`;
}

function typeHeader(item: PoeItem): 'single' | 'double' {
	switch (item.frameType) {
		case 0:
			return 'single';
		case 1:
			return 'single';
		case 2:
			return 'double';
		case 3:
			return 'double';
		case 9:
			return 'double';
		default:
			throw new Error(`Unexpected item frameType: ${item.frameType}`);
	}
}

// necropolis 45px
