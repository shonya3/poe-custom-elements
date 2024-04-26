import { LitElement, html, css, TemplateResult, PropertyValueMap, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PoeItem } from '../poe.types';
import './poe-socket-chain';
import { styleMap } from 'lit/directives/style-map.js';

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

		return html`<img alt=${this.item.baseType} .src=${this.item.icon} />
			${this.item.socketedItems && this.item.sockets
				? html`<poe-socket-chain
						style=${styleMap({
							'--w': this.item.w.toString(),
							'--h': this.item.h.toString(),
						})}
						.socketedItems=${this.item.socketedItems}
						.sockets=${this.item.sockets}
				  ></poe-socket-chain>`
				: nothing} `;
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

			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		img {
			display: block;
			width: 100%;
		}

		poe-socket-chain {
			position: absolute;
		}
	`;
}
