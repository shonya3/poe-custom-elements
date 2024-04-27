import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PoeItem } from '../../poe.types';

declare global {
	interface HTMLElementTagNameMap {
		'poe-item-info-header': ItemInfoHeader;
	}
}

@customElement('poe-item-info-header')
export class ItemInfoHeader extends LitElement {
	@property({ type: Object }) item!: PoeItem;

	protected render(): TemplateResult {
		return html`<header>Header</header>`;
	}

	static styles = css`
		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}
	`;
}
