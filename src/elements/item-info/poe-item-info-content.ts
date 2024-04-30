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
		</div>`;
	}

	static styles = css`
		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}

		:host {
			font-family: fontin;
			background-color: rgba(0, 0, 0, 0.8);
		}

		.content {
			padding-top: 0.4rem;
			padding-bottom: 0.5rem;
			text-align: center;
		}

		.augmented {
			color: #88f;
		}
	`;
}
