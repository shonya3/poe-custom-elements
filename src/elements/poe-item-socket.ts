import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SocketKind, GemKind } from '../poe.types';

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
	/** Has socketed item or not. */
	@property({ type: Boolean, reflect: true }) full!: boolean;
	/** Active or Support */
	@property({ reflect: true, attribute: 'gem-kind' }) gemKind!: GemKind;

	protected render(): TemplateResult {
		return html`<img .src=${this.gemImageSrc()} />
			<div class="highlight-ring"></div>`;
	}

	gemImageSrc() {
		const name = () => {
			switch (this.kind) {
				case 'A':
					return this.full ? 'todoAbyss' : 'todoAbyssFull';
				case 'B':
					return this.full ? 'intFull' : 'int';
				case 'G':
					return this.full ? 'dexFull' : 'dex';
				case 'R':
					return this.full ? 'strFull' : 'str';
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
