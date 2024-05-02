import { LitElement, html, css, TemplateResult, PropertyValueMap, nothing, render } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { PoeItem, SocketedItem } from '../poe.types';
import './poe-socket-chain';
import { classMap } from 'lit/directives/class-map.js';
import { SimpleTooltip } from './simple-tooltip';
import './simple-tooltip';
import './tooltip-json-icon';
import { JsonIconElement } from './tooltip-json-icon';

declare global {
	interface HTMLElementTagNameMap {
		'poe-item': PoeItemElement;
	}
}

/**
 * @cssprop --cell-size - Size of one tab cell in pixels.
 */
@customElement('poe-item')
export class PoeItemElement extends LitElement {
	/** PoE API item data https://www.pathofexile.com/developer/docs/reference#stashes-get */
	@property({ type: Object }) item!: PoeItem;
	/** Controls the visibility of sockets.
	 *
	 *  If set to true, sockets are always visible.
	 *  If set to false, sockets are only visible when the Alt key is pressed or when hovered over.
	 */
	@property({ type: Boolean, reflect: true, attribute: 'show-sockets' }) showSockets = false;

	/** Main visibility state for sockets */
	@state() socketsVisible = false;
	@state() hovered = false;
	@state() altPressed = false;

	@query('tooltip-json-icon') iconJson!: JsonIconElement;

	protected async willUpdate(map: PropertyValueMap<this>): Promise<void> {
		if (map.has('item')) {
			this.style.setProperty('--w', this.item.w.toString());
			this.style.setProperty('--h', this.item.h.toString());
			if (!this.item.identified) {
				this.style.setProperty('background-color', 'rgba(210, 0, 0, .18)');
			}
		}

		if (map.has('showSockets')) {
			this.socketsVisible = this.showSockets;
		}
		if (map.has('altPressed')) {
			if (this.altPressed) {
				this.socketsVisible = true;
			} else {
				this.socketsVisible = this.showSockets;
			}
		}
		if (map.has('hovered')) {
			if (this.hovered) {
				this.socketsVisible = true;
			} else {
				this.socketsVisible = this.showSockets;
			}
		}
	}

	get tooltipElement() {
		const next = this.nextElementSibling;
		if (next instanceof SimpleTooltip) {
			return next;
		} else {
			return null;
		}
	}

	protected render(): TemplateResult {
		if (!this.item) {
			return html`<p style="color: red">No Poe Api item data (.item)</p>`;
		}

		return html`
			<img alt=${this.item.baseType} .src=${this.item.icon} />
			${this.item.socketedItems && this.item.sockets
				? html`<poe-socket-chain
						@hovered-socketed-item-changed=${this.onHoveredSocketedItemChanged}
						class=${classMap({ hidden: !this.socketsVisible })}
						.socketedItems=${this.item.socketedItems}
						.sockets=${this.item.sockets}
						.w=${this.item.w}
				  ></poe-socket-chain>`
				: nothing}
			<tooltip-json-icon></tooltip-json-icon>
			${this.item.stackSize
				? html`<p class="stackSize">${this.item.stackSizeText || this.item.stackSize}</p>`
				: nothing}
		`;
	}

	constructor() {
		super();
		this.onAltPressed = this.onAltPressed.bind(this);
		this.onAltReleased = this.onAltReleased.bind(this);
		this.addEventListener('mouseenter', this.onMouseEnter);
		this.addEventListener('mouseleave', this.onMouseLeave);
	}

	onHoveredSocketedItemChanged(e: CustomEvent<SocketedItem>) {
		console.log(this.tooltipElement);
		if (this.tooltipElement) {
			const socketedItemContainer = this.tooltipElement.querySelector('.socketed-item');
			if (socketedItemContainer instanceof HTMLElement) {
				socketedItemContainer.innerHTML = '';
				const info = document.createElement('poe-item-info');
				if (e.detail) {
					info.item = e.detail as PoeItem;
					socketedItemContainer.append(info);
				}
			}
		}
	}

	protected firstUpdated(): void {
		SimpleTooltip.lazy(this, tooltip => {
			render(
				html`<div style="display:flex;align-items:flex-start;gap:1.2rem;z-index:500;padding:0;margin:0">
					<poe-item-info .item=${this.item}></poe-item-info>
					<div class="socketed-item"></div>
				</div>`,
				tooltip
			);
		});
	}

	onCtrlJClick = (e: KeyboardEvent) => {
		if (this.hovered) {
			if (e.code === 'KeyJ') {
				const icon = this.iconJson ?? document.createElement('tooltip-json-icon');
				if (!this.iconJson) {
					this.shadowRoot!.append(icon);
				}

				navigator.clipboard.writeText(JSON.stringify(this.item, null, 4));
				icon.showing = true;
				setTimeout(() => {
					icon.showing = false;
				}, 2000);
			}
		}
	};

	private onMouseEnter() {
		this.hovered = true;
	}
	private onMouseLeave() {
		this.hovered = false;
	}
	private onAltPressed(e: KeyboardEvent) {
		if (e.key === 'Alt') {
			e.preventDefault();
			this.altPressed = true;
		}
	}
	private onAltReleased() {
		this.altPressed = false;
	}
	connectedCallback(): void {
		super.connectedCallback();
		window.addEventListener('keydown', this.onAltPressed);
		window.addEventListener('keyup', this.onAltReleased);
		window.addEventListener('keydown', this.onCtrlJClick);
	}
	disconnectedCallback(): void {
		super.disconnectedCallback();
		window.removeEventListener('keydown', this.onAltPressed);
		window.removeEventListener('keyup', this.onAltReleased);
		window.removeEventListener('keydown', this.onCtrlJClick);
	}

	static styles = css`
		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}
		:host {
			--default-cell-size: 47;
			--cell-size: 47px; /** css prop */
			--w: '(computed) number of horizontal cells';
			--h: '(computed) number of vertical cells';
			width: calc(var(--cell-size) * var(--w));
			height: calc(var(--cell-size) * var(--h));

			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			font-family: fontin;
		}

		.stackSize {
			font-size: calc(var(--cell-size) / var(--default-cell-size) * 18);
			font-weight: bold;
			color: #fff;
			position: absolute;
			top: -1px;
			left: 5%;
			text-shadow: -1px -1px 0 #000, 0 -1px 0 #000, 1px -1px 0 #000, 1px 0 0 #000, 1px 1px 0 #000, 0 1px 0 #000,
				-1px 1px 0 #000, -1px 0 0 #000, -1px -1px 3px #000, 0 -1px 3px #000, 1px -1px 0 #000, 1px 0 3px #000,
				1px 1px 3px #000, 0 1px 3px #000, -1px 1px 3px #000, -1px 0 3px #000;
			pointer-events: none;
		}

		img {
			display: block;
			width: 100%;
		}

		poe-socket-chain {
			position: absolute;
		}

		.hidden {
			display: none !important;
		}

		#icon-json {
			position: absolute;
			top: 100px;
			right: 0px;
			color: yellow;
			opacity: 0;
			scale: 0.8;
			transform: translate(10px, -10px);
			transition: opacity, transform, top 0.2s ease-in;
			z-index: 20;
			pointer-events: none;
		}

		#icon-json.copied {
			opacity: 1;
			scale: 2;
			top: 0px;
		}
	`;
}

// icon shaper background: url(https://web.poecdn.com/image/inventory/ShaperBackground.png?w=1&h=3&x=65&y=111) center center no-repeat;
// function lazyIconJson(target: HTMLElement): SVGElement {
// 	const icon = `
//     <svg id="icon-json" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32">
// 		<path
// 			fill="#d6d024"
// 			d="M4 20v2h4.586L2 28.586L3.414 30L10 23.414V28h2v-8zm25-8l-2-6h-2v10h2v-6l2 6h2V6h-2zm-7.666-6h-2.667A1.67 1.67 0 0 0 17 7.667v6.667A1.67 1.67 0 0 0 18.666 16h2.667A1.67 1.67 0 0 0 23 14.334V7.667A1.67 1.67 0 0 0 21.334 6M21 14h-2V8h2zM9 7.667V10a2 2 0 0 0 2 2h2v2H9v2h4.334A1.67 1.67 0 0 0 15 14.334V12a2 2 0 0 0-2-2h-2V8h4V6h-4.334A1.67 1.67 0 0 0 9 7.667M5 14H3v-2H1v2.334A1.67 1.67 0 0 0 2.667 16h2.667A1.67 1.67 0 0 0 7 14.334V6H5z"
// 		/>
// 	</svg>
//     `;
// 	const template = document.createElement('template');
// 	template.innerHTML = icon;
// 	const node = template.content.children[0];
// 	console.log(node);

// 	target.shadowRoot?.append(node);
// 	if (!target.shadowRoot) {
// 		console.warn('Cannot insert json icon, no shadowRoot');
// 	}
// 	return node as SVGElement;
// }
