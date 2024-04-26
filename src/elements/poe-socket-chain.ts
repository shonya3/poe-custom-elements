import { LitElement, html, css, TemplateResult } from 'lit';
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

	protected render(): TemplateResult {
		return html`<ul>
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
