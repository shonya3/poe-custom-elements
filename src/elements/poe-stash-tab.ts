import { LitElement, html, css, TemplateResult, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { PoeItem, StashType, TabWithItems } from '../poe.types';
import './poe-item';
import { styleMap } from 'lit/directives/style-map.js';
import { appendFontinStyle } from './lib';
import { PoeItemElement } from './poe-item';

declare global {
	interface HTMLElementTagNameMap {
		'poe-stash-tab': PoeStashTabElement;
	}
}

type Direction = 'down' | 'right' | 'up' | 'left';

@customElement('poe-stash-tab')
export class PoeStashTabElement extends LitElement {
	/** PoE API tab data https://www.pathofexile.com/developer/docs/reference#stashes-get */
	@property({ type: Object }) tab!: TabWithItems;

	@state() tabState!: TabWithItems;

	get focusWithin(): boolean {
		return this.matches(':focus-within');
	}

	get activeItemElement(): PoeItemElement | null {
		return this.shadowRoot?.querySelector('poe-item:focus') ?? null;
	}

	protected async willUpdate(map: PropertyValueMap<this>): Promise<void> {
		if (map.has('tab')) {
			this.tabState = structuredClone(this.tab);
			const cells = cellsSideCount(this.tabState.type);
			if (this.tabState.type === 'EssenceStash' || this.tabState.type === 'CurrencyStash') {
				this.tabState!.items.forEach(item => {
					const newY = Math.floor(item.x / 12);
					const newX = item.x % 12;

					item.x = newX;
					item.y = newY;
				});
			}
			this.tabState.items = orderItems(this.tabState.items);

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

		return html`
			<ul>
				${this.tabState.items.map(
					item => html`<li
						style=${styleMap({
							'grid-column': `${item.x + 1} / span ${item.w}`,
							'grid-row': `${item.y + 1} / span ${item.h}`,
						})}
					>
						<poe-item
							data-x=${item.x}
							data-y=${item.y}
							tabindex="0"
							placed
							style="--cell-size: ${sizeOfCellPixels}"
							.item=${item}
						></poe-item>
					</li>`
				)}
			</ul>
		`;
	}

	connectedCallback(): void {
		super.connectedCallback();
		appendFontinStyle();
		window.addEventListener('keydown', this.onKeyDown);
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		window.removeEventListener('keydown', this.onKeyDown);
	}

	onKeyDown = async (e: KeyboardEvent): Promise<void> => {
		if (this.focusWithin) {
			if (['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(e.code)) {
				const direction = e.code.slice(5).toLowerCase() as Direction;
				const activeItemElement = this.activeItemElement;
				if (activeItemElement) {
					const item = await findClosestItem({
						activeItem: activeItemElement.item,
						direction,
						items: this.tabState.items,
						tabElement: this,
						tabCellsSideCount: this.tab.type === 'QuadStash' ? 24 : 12,
					});

					if (item) {
						item.focus();
					}
				}
			}
		}
	};

	tabImageSrc(): string {
		switch (this.tabState.type) {
			case 'PremiumStash':
				return '/poe-images/StashPanelGrid.png';
			case 'NormalStash':
			case 'EssenceStash':
			case 'CurrencyStash':
				return '/poe-images/StashPanelGrid.png';
			case 'QuadStash':
			case 'FragmentStash':
				return '/poe-images/QuadStashPanelGrid.png';
			default:
				return '';
		}
	}

	sizeOfCellPixels(): `${string}px` | null {
		if (!this.tabState) {
			return null;
		}
		const cells = cellsSideCount(this.tabState.type);
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
			font-family: fontin;
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

		poe-item:focus,
		poe-item:focus-visible {
			outline: 3px solid rgb(39, 186, 253);
		}
		:host(:focus-within) {
			outline: 3px solid rgb(39, 186, 253);
		}
	`;
}

function cellsSideCount(stashType: StashType): number | null {
	switch (stashType) {
		case 'PremiumStash':
			return 12;
		case 'NormalStash':
			return 12;
		case 'QuadStash':
			return 24;
		case 'FragmentStash':
			return 24;
		default:
			return 12;
	}
}

function orderItems(items: Array<PoeItem>): Array<PoeItem> {
	return Object.values(Object.groupBy(items, ({ y }) => y)).flatMap((itemsByRow = []) => {
		itemsByRow.sort((a, b) => a.x - b.x);
		return itemsByRow;
	});
}

async function findClosestItem({
	activeItem,
	direction,
	items,
	tabElement,
	tabCellsSideCount,
}: {
	activeItem: PoeItem;
	direction: Direction;
	items: Array<PoeItem>;
	tabElement: PoeStashTabElement;
	tabCellsSideCount: number;
}) {
	if (direction === 'down') {
		let currentX = activeItem.x;
		let currentY = activeItem.y + activeItem.h;
		let item = null;

		if (currentY + 1 > tabCellsSideCount) {
			return null;
		}
		while (!item) {
			for (let dx = 0; dx < activeItem.w; dx++) {
				item = await itemElementFromXY({
					tabElement,
					items,
					coordinates: { x: currentX + dx, y: currentY },
				});

				if (item) {
					break;
				}
			}

			if (currentY === tabCellsSideCount - 1 && currentX === tabCellsSideCount - 1) {
				break;
			}

			if (currentY === tabCellsSideCount - 1) {
				currentY = activeItem.y;
				currentX++;
			} else {
				currentY++;
			}
		}

		return item;
	} else if (direction === 'right') {
		let currentX = activeItem.x + activeItem.w;
		let currentY = activeItem.y;
		let item = null;

		if (currentX + 1 > tabCellsSideCount) {
			return null;
		}
		while (!item) {
			for (let dy = 0; dy < activeItem.h; dy++) {
				item = await itemElementFromXY({
					tabElement,
					items,
					coordinates: { x: currentX, y: currentY + dy },
				});

				if (item) {
					break;
				}
			}

			if (currentY === tabCellsSideCount - 1 && currentX === tabCellsSideCount - 1) {
				break;
			}

			if (currentX === tabCellsSideCount - 1) {
				currentX = activeItem.x + activeItem.w;
				currentY++;
			} else {
				currentX++;
			}
		}

		return item;
	} else if (direction === 'up') {
		let currentX = activeItem.x;
		let currentY = activeItem.y - 1;
		let item = null;

		if (currentY < 0) {
			return null;
		}
		while (!item) {
			for (let dx = 0; dx < activeItem.w; dx++) {
				item = await itemElementFromXY({
					tabElement,
					items,
					coordinates: { x: currentX + dx, y: currentY },
				});

				if (item) {
					break;
				}
			}

			if (currentY === 0 && currentX === tabCellsSideCount - 1) {
				break;
			}

			if (currentY === 0) {
				currentY = activeItem.y;
				currentX = currentX + 1;
			} else {
				currentY--;
			}
		}

		return item;
	} else if (direction === 'left') {
		let currentX = activeItem.x - 1;
		let currentY = activeItem.y;
		let item = null;

		if (currentX < 0) {
			return null;
		}
		while (!item) {
			for (let dy = 0; dy < activeItem.h; dy++) {
				item = await itemElementFromXY({
					tabElement,
					items,
					coordinates: { x: currentX, y: currentY + dy },
				});

				if (item) {
					break;
				}
			}

			if (currentX === 0 && currentY === tabCellsSideCount - 1) {
				break;
			}

			if (currentX === 0) {
				currentX = activeItem.x;
				currentY = currentY + 1;
			} else {
				currentX--;
			}
		}

		return item;
	}
}

function itemFromXY({
	coordinates,
	items,
}: {
	items: Array<PoeItem>;
	coordinates: { x: number; y: number };
}): PoeItem | null {
	const itemOnExactXY = items.find(item => item.x === coordinates.x && item.y === coordinates.y);
	if (itemOnExactXY) {
		return itemOnExactXY;
	}

	for (const item of items) {
		for (let y = item.y; y < item.y + item.h; y++) {
			for (let x = item.x; x < item.x + item.w; x++) {
				if (x === coordinates.x && y === coordinates.y) {
					return item;
				}
			}
		}
	}
	return null;
}

async function itemElementFromXY({
	tabElement,
	coordinates,
	items,
}: {
	tabElement: PoeStashTabElement;
	coordinates: { x: number; y: number };
	items: Array<PoeItem>;
}): Promise<PoeItemElement | null> {
	const item = itemFromXY({
		coordinates,
		items,
	});
	if (!item) {
		return null;
	}

	if (!tabElement.shadowRoot!.querySelector('poe-item')) {
		await tabElement.updateComplete;
	}

	return (
		tabElement.shadowRoot?.querySelector<PoeItemElement>(`poe-item[data-x="${item.x}"][data-y="${item.y}"]`) ?? null
	);
}
