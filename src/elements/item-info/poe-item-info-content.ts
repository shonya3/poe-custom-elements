import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PoeItem } from '../../poe.types';
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
			<ul class="">
				${(this.item.properties ?? []).map(property => {
					return html`<li><poe-item-property .property=${property}></poe-item-property></li>`;
				})}
			</ul>
			<poe-separator></poe-separator>
			<poe-requirements .requirements=${this.item.requirements ?? []}></poe-requirements>
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
	`;
}
