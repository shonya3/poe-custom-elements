import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html, css, TemplateResult, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Socket, SocketedItem } from '../poe.types';
import './poe-item-socket';

declare global {
	interface HTMLElementTagNameMap {
		'poe-socket-chain': PoeSocketChainElement;
	}
}

/**
 * @cssprop --cell-size - Size of one tab cell in pixels.
 */
@customElement('poe-socket-chain')
export class PoeSocketChainElement extends LitElement {
	@property({ type: Array }) socketedItems: Array<SocketedItem> = [];
	@property({ type: Array }) sockets: Array<Socket> = [];
	@property({ type: Number }) w!: number;

	protected render(): TemplateResult {
		return html`<ul
			class=${classMap({
				'grid-layout--w1': this.w === 1,
				'grid-layout--w2': this.w === 2,
			})}
		>
			${this.sockets.map(
				(socket, i) => html`<li style="grid-area: s${i + 1}">
					<poe-item-socket kind=${socket.sColour}></poe-item-socket>
				</li>`
			)}
		</ul>`;
	}

	static styles = css`
		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}
		:host {
			display: inline-block;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.grid-layout--w1 {
			grid-template-areas:
				's1'
				's2'
				's3'
				's4';
		}

		.grid-layout--w2 {
			grid-template-areas:
				's1 s2'
				's4 s3'
				's5 s6';
		}

		ul {
			list-style: none;
			display: grid;
			grid-template-areas:
				's1 s2'
				's4 s3'
				's5 s6';
		}

		li {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	`;
}
