import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './poe-item';

declare global {
	interface HTMLElementTagNameMap {
		'poe-item-card': PoeItemCardElement;
	}
}

/**
 * @summary Itemized divination card with divination card element on hover,
 *          that requires only a name of card.
 *
 * Copy item-card folder to your public dir
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
				icon: '/item-card/InventoryIcon.png',
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
