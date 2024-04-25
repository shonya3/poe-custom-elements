import { LitElement, html, css, TemplateResult, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PoeItem } from '../poe.types';

declare global {
	interface HTMLElementTagNameMap {
		'poe-item': PoeItemElement;
	}
}

/**
 * @cssprop --cell-size - Size of one tab cell in pixels.
 */
@customElement('poe-item')
export class PoeItemElement extends LitElement {
	/** PoE API item data https://www.pathofexile.com/developer/docs/reference#stashes-get */
	@property({ type: Object }) item!: PoeItem;

	protected willUpdate(map: PropertyValueMap<this>): void {
		if (map.has('item')) {
			this.style.setProperty('--w', this.item.w.toString());
			this.style.setProperty('--h', this.item.h.toString());
		}
	}

	protected render(): TemplateResult {
		if (!this.item) {
			return html`<p style="color: red">No Poe Api item data (.item)</p>`;
		}

		return html`<img alt=${this.item.baseType} .src=${this.item.icon} /> `;
	}

	static styles = css`
		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}
		:host {
			--cell-size: 47px; /** css prop */
			--w: '(computed) number of horizontal cells';
			--h: '(computed) number of vertical cells';
			width: calc(var(--cell-size) * var(--w));
			height: calc(var(--cell-size) * var(--h));

			display: flex;
			justify-content: center;
			align-items: center;
		}

		img {
			display: block;
			width: 100%;
		}
	`;
}
