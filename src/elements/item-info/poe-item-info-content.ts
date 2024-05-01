import { LitElement, html, css, TemplateResult, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ItemProperty, PoeItem, Requirement } from '../../poe.types';
import './poe-separator';
import './poe-item-property';
import './poe-requirements';

declare global {
	interface HTMLElementTagNameMap {
		'poe-item-info-content': PoeItemInfoContentElement;
	}
}

@customElement('poe-item-info-content')
export class PoeItemInfoContentElement extends LitElement {
	@property({ type: Object }) item!: PoeItem;

	protected render(): TemplateResult {
		return html`<div class="content">
			${[
				this.properties.length
					? html`<ul>
							${this.properties.map(property => {
								return html`<li><poe-item-property .property=${property}></poe-item-property></li>`;
							})}
					  </ul> `
					: nothing,
				this.requirements.length
					? html` <poe-requirements .requirements=${this.requirements}></poe-requirements>`
					: nothing,
				this.implicits.length
					? html` ${this.implicits.map(imp => html`<p class="augmented">${imp}</p>`)} `
					: nothing,
				this.explicits.length || this.crafts.length
					? html`
							${this.explicits.map(exp => html`<p class="augmented">${exp}</p>`)}
							${this.crafts.map(craft => html`<p class="craft">${craft}</p>`)}
					  `
					: nothing,
				this.item.identified ? nothing : html` <p class="unidentified">Unidentified</p>`,
				this.item.corrupted ? html` <p class="corrupted">corrupted</p>` : nothing,
			]
				.filter(el => el !== nothing)
				.flatMap((el, index, arr) =>
					index === arr.length - 1 ? [el] : [el, html`<poe-separator></poe-separator>`]
				)}
		</div>`;
	}

	get properties(): Array<ItemProperty> {
		return this.item.properties ?? [];
	}

	get requirements(): Array<Requirement> {
		return this.item.requirements ?? [];
	}

	get implicits(): Array<string> {
		return this.item.implicitMods ?? [];
	}

	get explicits(): Array<string> {
		return this.item.explicitMods ?? [];
	}

	get crafts(): Array<string> {
		return this.item.craftedMods ?? [];
	}

	static styles = css`
		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}

		ul {
			list-style: none;
		}

		:host {
			font-family: fontin;
			display: inline-block;
			background-color: rgba(0, 0, 0, 0.8);
			width: 100%;
			height: 100%;
		}

		.content {
			padding-top: 0.4rem;
			padding-bottom: 0.5rem;
			text-align: center;
		}

		.augmented {
			color: #88f;
		}

		.craft {
			color: #b4b4ff;
		}

		.unidentified,
		.corrupted {
			color: #d20000;
		}
	`;
}
