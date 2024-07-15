import { LitElement, PropertyValueMap, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { FrameKind } from '../../poe.types';
import { basePath } from '../../lib/base_path';

@customElement('poe-separator')
export class PoeSeparatorElement extends LitElement {
	@property({ reflect: true }) kind: FrameKind = 'rare';

	protected willUpdate(map: PropertyValueMap<this>): void {
		this.style.setProperty('--separator-background-image', `${basePath()}/poe-images/separator-rare.png`);
		if (map.has('kind')) {
			this.style.setProperty(
				'--separator-background-image',
				`url(${basePath()}/poe-images/separator-${this.kind}.png)`
			);
		}
	}

	static styles = css`
		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}

		:host {
			--separator-background-image: computed;
			display: block;
			height: 7.91075px;
			padding-block: 1px;
			background: var(--separator-background-image) center no-repeat;
		}
	`;
}

declare global {
	interface HTMLElementTagNameMap {
		'poe-separator': PoeSeparatorElement;
	}
}
