import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

declare global {
	interface HTMLElementTagNameMap {
		'poe-separator': PoeSeparatorElement;
	}
}

@customElement('poe-separator')
export class PoeSeparatorElement extends LitElement {
	static styles = css`
		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}

		:host {
			display: block;
			height: 7.91075px;
			padding-block: 1px;
			background: url(/poe-images/separator-rare.png) center no-repeat;
		}
	`;
}
