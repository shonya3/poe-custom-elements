import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './poe-item';
import { basePath } from '../lib/base_path';

/**
 * Itemized divination card with divination card element on hover, that requires only a name of card.
 * @summary Itemized divination card with divination card element on hover,
 *          that requires only a name of card.
 *
 * @cssprop --poe-item-size        - Size of item.
 * @cssprop --stack-size-font-size - Font size of stack size.
 *
 * Copy item-card and divination-card folders to your public dir.
 */
@customElement('poe-item-card')
export class PoeItemCardElement extends LitElement {
	@property({ reflect: true }) name = 'Rain of Chaos';
	@property({ type: Number, attribute: 'stack-size' }) stackSize?: number;
	@property({ type: Number, attribute: 'max-stack-size' }) maxStackSize?: number;

	protected render(): TemplateResult {
		return html`<poe-item
			.item=${{
				baseType: this.name,
				stackSize: this.stackSize,
				maxStackSize: this.maxStackSize,
				icon: `${basePath()}/item-card/InventoryIcon.png`,
				w: 1,
				h: 1,
				identified: true,
				frameType: 6,
				league: 'Standard',
				inventoryId: '',
				name: '',
				x: 0,
				y: 0,
				id: '',
				verified: false,
				typeLine: this.name,
				ilvl: 0,
			}}
		></poe-item>`;
	}

	static styles = css`
		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}

		:host {
			display: inline-block;
			width: fit-content;
		}
	`;
}

declare global {
	interface HTMLElementTagNameMap {
		'poe-item-card': PoeItemCardElement;
	}
}
