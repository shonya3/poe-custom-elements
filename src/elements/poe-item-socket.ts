import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SocketKind, SocketedItem } from '../poe.types';

declare global {
	interface HTMLElementTagNameMap {
		'poe-item-socket': PoeItemSocketElement;
	}
}

/**
 * @cssprop --cell-size - Size of one tab cell in pixels.
 */
@customElement('poe-item-socket')
export class PoeItemSocketElement extends LitElement {
	/** Socket color or Abyss */
	@property({ reflect: true }) kind!: SocketKind;
	@property({ type: Object }) socketedItem?: SocketedItem;

	protected render(): TemplateResult {
		return html`<img .src=${this.gemImageSrc()} alt="" />
			<div class="highlight-ring"></div>
			<img class="socketed-item-image" src="" alt="" /> `;
	}

	gemImageSrc() {
		const name = () => {
			switch (this.kind) {
				case 'A':
					return this.socketedItem ? 'todoAbyss' : 'todoAbyssFull';
				case 'B':
					return this.socketedItem ? 'intFull' : 'int';
				case 'G':
					return this.socketedItem ? 'dexFull' : 'dex';
				case 'R':
					return this.socketedItem ? 'strFull' : 'str';
			}
		};

		return `/poe-images/${name()}.png`;
	}

	static styles = css`
		:host {
			display: inline-block;
			width: var(--cell-size);
			height: var(--cell-size);
			position: relative;
		}

		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}

		.socketed-item-image {
		}

		.highlight-ring {
			display: none;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			position: absolute;
			content: '';
			width: calc(var(--cell-size) / var(--default-cell-size) * 31);
			height: calc(var(--cell-size) / var(--default-cell-size) * 31);
			border-radius: 50%;

			box-shadow: 0px 0px 4px 2px #fff;
		}

		:host(:hover) .highlight-ring {
			display: initial;
		}

		img {
			width: 100%;
			display: block;
		}
	`;
}
