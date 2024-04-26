import { LitElement, html, css, TemplateResult, PropertyValueMap, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { PoeItem } from '../poe.types';
import './poe-socket-chain';
import { classMap } from 'lit/directives/class-map.js';

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
	@property({ type: Boolean, reflect: true, attribute: 'show-sockets' }) showSockets = true;

	/** Main visibility state for sockets */
	@state() socketsVisible = false;
	@state() hovered = false;
	@state() altPressed = false;

	protected willUpdate(map: PropertyValueMap<this>): void {
		if (map.has('item')) {
			this.style.setProperty('--w', this.item.w.toString());
			this.style.setProperty('--h', this.item.h.toString());
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

	protected render(): TemplateResult {
		if (!this.item) {
			return html`<p style="color: red">No Poe Api item data (.item)</p>`;
		}

		return html`
			<img alt=${this.item.baseType} .src=${this.item.icon} />
			${this.item.socketedItems && this.item.sockets
				? html`<poe-socket-chain
						class=${classMap({ hidden: !this.socketsVisible })}
						.socketedItems=${this.item.socketedItems}
						.sockets=${this.item.sockets}
						.w=${this.item.w}
				  ></poe-socket-chain>`
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
	}
	disconnectedCallback(): void {
		super.disconnectedCallback();
		window.removeEventListener('keydown', this.onAltPressed);
	}

	static styles = css`
		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}
		:host {
			--cell-size: 47px; /** css prop */
			--w: '(computed) number of horizontal cells';
			--h: '(computed) number of vertical cells';
			width: calc(var(--cell-size) * var(--w));
			height: calc(var(--cell-size) * var(--h));

			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
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
	`;
}
