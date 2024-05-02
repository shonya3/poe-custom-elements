import { poeColorsCssVariables } from './../../styles/poe-colors-vars.style';
import { styles as poeColorsStyles } from '../../styles/poe-colors.style';
import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { FrameKind, PoeItem } from '../../poe.types';
import { classMap } from 'lit/directives/class-map.js';
import { frameKind } from '../lib';

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
				[`${frame}`]: true,
			})}
			style="background: ${headerBackgroundUrl(frame ?? 'normal', this.item.identified)}"
		>
			${size === 'double'
				? html`
						<div class="content mt-2">${this.item.name}</div>
						<div class="content mb-4">${this.item.baseType}</div>
				  `
				: html`<div class="content">${this.item.baseType}</div>`}
		</header>`;
	}

	static styles = css`
		${poeColorsStyles}

		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}

		:host {
			${poeColorsCssVariables}
		}

		.header {
			font-family: 'fontin';
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}

		.header--single {
			height: 33px;
		}

		.header--double {
			height: 54px;
		}

		.header--necropolis {
			height: 45px;
		}

		.content {
			padding-inline: 2.5rem;
			font-size: 19px;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}

		.mt-2 {
			margin-top: 2px;
		}

		.mb-4 {
			margin-bottom: 0.25rem;
		}
	`;
}

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
