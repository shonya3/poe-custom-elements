import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PoeItem } from '../../poe.types';
import { classMap } from 'lit/directives/class-map.js';

declare global {
	interface HTMLElementTagNameMap {
		'poe-item-info-header': ItemInfoHeader;
	}
}

@customElement('poe-item-info-header')
export class ItemInfoHeader extends LitElement {
	@property({ type: Object }) item!: PoeItem;

	protected render(): TemplateResult {
		const frame = frameKind(this.item.frameType);
		const size = frame ? singleOrDouble(frame, this.item.identified) : null;

		return html`<header
			class=${classMap({
				header: true,
				'header--single': size === 'single',
				'header--double': size === 'double',
				'header--necropolis': frame === 'necropolis',
			})}
			style="background: ${headerBackgroundUrl(frame ?? 'normal', this.item.identified)}"
		>
			${size === 'double'
				? html`
						<div class="content">${this.item.name}</div>
						<div class="content">${this.item.baseType}</div>
				  `
				: html`<div class="content">${this.item.baseType}</div>`}
		</header>`;
	}

	static styles = css`
		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}

		.header {
			font-family: 'fontin';
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}

		.header--single {
			height: 27px;
		}

		.header--double {
			height: 54px;
		}

		.header--necropolis {
			height: 45px;
		}

		.content {
			font-size: 19px;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}
	`;
}

type FrameKind = 'normal' | 'magic' | 'rare' | 'unique' | 'gem' | 'currency' | 'necropolis';

function headerBackgroundUrl(frameKind: FrameKind, identified: boolean): string {
	const size = singleOrDouble(frameKind, identified);
	const left = `url(${headerAssetUrl(frameKind, size, 'left')}) top left no-repeat`;
	const right = `url(${headerAssetUrl(frameKind, size, 'right')}) top right no-repeat`;
	const middle = `url(${headerAssetUrl(frameKind, size, 'middle')}) top center`;
	return `${left},${right},${middle}`;
}

function headerAssetUrl(
	frameKind: FrameKind,
	size: 'single' | 'double',
	side: 'left' | 'middle' | 'right',
	url = '/poe-images/'
): string {
	return `${url}${['header', size === 'double' ? 'double' : '', frameKind, side]
		.filter(s => s.length > 0)
		.join('-')}.png`;
}

function singleOrDouble(frameKind: FrameKind, identified: boolean): 'single' | 'double' {
	switch (frameKind) {
		case 'normal':
			return 'single';
		case 'magic':
			return 'single';
		case 'rare':
			return identified ? 'double' : 'single';
		case 'unique':
			return identified ? 'double' : 'single';
		case 'gem':
			return 'single';
		case 'currency':
			return 'single';
		case 'necropolis':
			return 'single';
	}
}

/** https://www.pathofexile.com/developer/docs/reference#type-FrameType */
function frameKind(frameType: number): FrameKind | null {
	switch (frameType) {
		case 0:
			return 'normal';
		case 1:
			return 'magic';
		case 2:
			return 'rare';
		case 3:
			return 'unique';
		case 4:
			return 'gem';
		case 5:
			return 'currency';
		// case 6:
		// return 'divination card';
		case 11:
			return 'necropolis';
		default:
			return null;
	}
}