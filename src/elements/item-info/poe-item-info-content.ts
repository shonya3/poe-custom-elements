import { LitElement, html, css, TemplateResult, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ItemProperty, PoeItem, Requirement } from '../../poe.types';
import './poe-separator';
import './poe-item-property';
import './poe-requirements';
import { frameKind } from '../lib';

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
				this.item.itemLevel
					? html`<p>Monster Level: <span class="monster-level">${this.item.itemLevel}</span></p>`
					: nothing,
				this.requirements.length
					? html` <poe-requirements .requirements=${this.requirements}></poe-requirements>`
					: nothing,
				this.enchantments.length
					? html`${this.enchantments.map(enc =>
							enc.split('\n').map(enc => html`<p class="enchant">${enc}</p>`)
					  )}`
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
				this.item.descrText ? html`<p class="description-text">${this.item.descrText}</p>` : nothing,
				this.item.flavourText
					? html`${this.item.flavourText.map((line, i, arr) => {
							if (i === arr.length - 1 && line.includes('<default>')) {
								return html`<p class="default mt-16">${line.match(/{(.*?)}/)?.[1] ?? ''}</p>`;
							} else {
								return html`<p class="flavour-text">${line}</p>`;
							}
					  })}`
					: nothing,
			]
				.filter(el => el !== nothing)
				.flatMap((el, index, arr) =>
					index === arr.length - 1
						? [el]
						: [el, html`<poe-separator .kind=${frameKind(this.item.frameType) ?? 'rare'}></poe-separator>`]
				)}
		</div>`;
	}

	protected firstUpdated(): void {
		this.style.setProperty('--description-width', window.getComputedStyle(this).width);
	}

	get enchantments(): Array<string> {
		return this.item.enchantMods ?? [];
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
			color: #7f7f7f;
			--description-width: 300px;
			max-width: 500px;
		}

		.content {
			padding-top: 0.4rem;
			padding-bottom: 0.5rem;
			text-align: center;
			display: grid;
			gap: 0.05rem;
		}

		.augmented {
			color: #88f;
		}

		.craft,
		.enchant {
			color: #b4b4ff;
		}

		.unidentified,
		.corrupted {
			color: #d20000;
		}

		.monster-level {
			color: #fff;
		}

		.flavour-text {
			color: #af6025;
		}

		.mt-16 {
			margin-top: 1rem;
		}

		.description-text {
			margin-inline: auto;
			display: flex;
			font-style: italic;
			max-width: var(--description-width);
			text-wrap: balance;
		}
	`;
}
