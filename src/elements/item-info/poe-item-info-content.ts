import { LitElement, html, css, TemplateResult, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PoeItem, Requirement } from '../../poe.types';
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

	protected render(): TemplateResult {
		return html`<div class="content">
			<ul class="">
				${(this.item.properties ?? []).map(property => {
					return html`<li><poe-item-property .property=${property}></poe-item-property></li>`;
				})}
			</ul>
			${this.requirements.length
				? html`<poe-separator></poe-separator>
						<poe-requirements .requirements=${this.requirements}></poe-requirements>`
				: nothing}
			${this.implicits.length
				? html`
						<poe-separator> </poe-separator>${this.implicits.map(
							imp => html`<p class="augmented">${imp}</p>`
						)}
				  `
				: nothing}
			${this.explicits.length
				? html`
						<poe-separator> </poe-separator>${this.explicits.map(
							exp => html`<p class="augmented">${exp}</p>`
						)}
				  `
				: nothing}
			${this.crafts.length ? html` ${this.crafts.map(craft => html`<p class="craft">${craft}</p>`)} ` : nothing}
			${this.item.identified
				? nothing
				: html`<poe-separator></poe-separator>
						<p class="unidentified">Unidentified</p>`}
		</div>`;
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

		.unidentified {
			color: #d20000;
		}
	`;
}
