import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PoeItem } from '../../poe.types';
import './poe-item-info-content';
import './poe-item-info-header';
import '../divination-card/poe-divination-card';
import { frameKind } from '../lib';

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
		if (!this.item) {
			return html`<p style="color: red">No Poe Api item data (.item)</p>`;
		}

		if (frameKind(this.item.frameType) === 'divination') {
			return html`<poe-divination-card .name=${this.item.baseType}></poe-divination-card>`;
		}

		return html`<poe-item-info-header .item=${this.item}></poe-item-info-header>
			<poe-item-info-content .item=${this.item}></poe-item-info-content> `;
	}

	static styles = css`
		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}
		:host {
			display: block;
			width: fit-content;
			min-width: max-content;
		}

		poe-item-info-content {
			padding-inline: 1rem;
		}
	`;
}
