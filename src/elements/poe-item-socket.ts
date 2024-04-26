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
		return html`<img .src=${this.gemImageSrc()} />`;
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
		}

		img {
			width: 100%;
			display: block;
		}

		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}
	`;
}
