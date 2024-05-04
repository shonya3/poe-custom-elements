import { LitElement, html, css, TemplateResult, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { TabWithItems } from '../poe.types';
import './poe-item';
import { styleMap } from 'lit/directives/style-map.js';

declare global {
	interface HTMLElementTagNameMap {
		'poe-stash-tab': PoeStashTabElement;
	}
}

@customElement('poe-stash-tab')
export class PoeStashTabElement extends LitElement {
	/** PoE API tab data https://www.pathofexile.com/developer/docs/reference#stashes-get */
	@property({ type: Object }) tab!: TabWithItems;

	@state() tabState?: TabWithItems;

	protected willUpdate(map: PropertyValueMap<this>): void {
		if (map.has('tab')) {
			if (this.tab.type === 'EssenceStash' || this.tab.type === 'CurrencyStash') {
				this.tabState = structuredClone(this.tab);
			}

			const cells = this.cellsSideCount();
			if (cells) {
				this.style.setProperty('--cells-side-count', cells.toString());
			}
			this.style.setProperty('--background-image', `url(${this.tabImageSrc()})`);
		}
	}

	protected render(): TemplateResult {
		if (!this.tab) {
			this.style.setProperty('border', '2px solid red');
			return html`<p style="color: red">No Poe Api stash tab data (.tab)</p>`;
		}

		if (!['NormalStash', 'PremiumStash', 'QuadStash', 'EssenceStash', 'CurrencyStash'].includes(this.tab.type)) {
			this.style.setProperty('border', '2px solid red');
			return html`<p style="color: red; font-size: 24px">
				StashType ( ${this.tab.type} ) is not supported ( yet? ).
			</p>`;
		}

		const sizeOfCellPixels = this.sizeOfCellPixels();

		if (this.tab.type === 'EssenceStash' || this.tab.type === 'CurrencyStash') {
			this.tabState!.items.forEach(item => {
				const newY = Math.floor(item.x / 12);
				const newX = item.x % 12;

				item.x = newX;
				item.y = newY;
			});

			return html`
				<ul>
					${this.tabState!.items.map(
						item => html`<li
							style=${styleMap({
								'grid-column': `${item.x + 1} / span ${item.w}`,
								'grid-row': `${item.y + 1} / span ${item.h}`,
							})}
						>
							<poe-item placed style="--cell-size: ${sizeOfCellPixels}" .item=${item}></poe-item>
						</li>`
					)}
				</ul>
			`;
		}

		return html`
			<ul>
				${this.tab.items.map(
					item => html`<li
						style=${styleMap({
							'grid-column': `${item.x + 1} / span ${item.w}`,
							'grid-row': `${item.y + 1} / span ${item.h}`,
						})}
					>
						<poe-item placed style="--cell-size: ${sizeOfCellPixels}" .item=${item}></poe-item>
					</li>`
				)}
			</ul>
		`;
	}

	tabImageSrc(): string {
		switch (this.tab.type) {
			case 'PremiumStash':
				return '/poe-images/StashPanelGrid.png';
			case 'NormalStash':
			case 'EssenceStash':
			case 'CurrencyStash':
				return '/poe-images/StashPanelGrid.png';
			case 'QuadStash':
				return '/poe-images/QuadStashPanelGrid.png';
			default:
				return '';
		}
	}

	cellsSideCount(): number | null {
		switch (this.tab.type) {
			case 'PremiumStash':
				return 12;
			case 'NormalStash':
				return 12;
			case 'QuadStash':
				return 24;
			default:
				return 12;
		}
	}

	sizeOfCellPixels(): `${string}px` | null {
		const cells = this.cellsSideCount();
		return cells ? `${564 / cells}px` : null;
	}

	static styles = css`
		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}
		:host {
			display: block;
			--size: 569px;
			--size-of-all-inner-borders: 5px;
			--cells-side-count: '(computed) Number of cells';
			--background-image: '(computed)';
			width: var(--size);
			height: var(--size);
			background-image: var(--background-image);
		}

		ul {
			width: var(--size);
			height: var(--size);
			list-style: none;
			display: grid;
			grid-template-rows: repeat(var(--cells-side-count), 1fr);
			grid-template-columns: repeat(var(--cells-side-count), 1fr);
			gap: calc(var(--size-of-all-inner-borders) / var(--cells-side-count));
		}

		poe-item {
		}
	`;
}
