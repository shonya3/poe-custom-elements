import { LitElement, html, css, TemplateResult, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ItemProperty } from '../../poe.types';
import { classMap } from 'lit/directives/class-map.js';

declare global {
	interface HTMLElementTagNameMap {
		'poe-item-property': PoeItemPropertyElement;
	}
}

@customElement('poe-item-property')
export class PoeItemPropertyElement extends LitElement {
	@property({ type: Object }) property!: ItemProperty;

	protected render(): TemplateResult {
		if (!this.property) {
			return html`<p style="color: red">No item property provided</p>`;
		}

		return html`<div class="property">${Values(this.property)}</div>`;
	}

	static styles = css`
		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}
		.property {
			color: #7f7f7f;
		}
		.value {
			color: #fff;
		}
		.fire {
			color: #960000;
		}
		.cold {
			color: #366492;
		}
		.lightning {
			color: gold;
		}
		.colorAugmented {
			color: #88f;
		}
	`;
}

function Values(property: ItemProperty) {
	if (property.values.length === 0) {
		return property.name;
	}

	if (property.displayMode === 0) {
		if (property.name === 'Elemental Damage') {
			const colorClass = (num: number) => {
				switch (num) {
					case 4:
						return 'fire';
					case 5:
						return 'cold';
					case 6:
						return 'lightning';
					default:
						return '';
				}
			};
			const values = property.values.map((value, i) => {
				return html`<span
						class=${classMap({
							value: true,
							[`${colorClass(value[1])}`]: true,
						})}
						>${value[0]}</span
					>${i === property.values.length - 1 ? nothing : ','} `;
			});
			return html`${property.name} ${values}`;
		}

		return html`${property.name}: <span class="value">${property.values[0][0]}</span>`;
	}

	if (property.displayMode === 3) {
		return parseDisplayMode3(property, value => html`<span class="value">${value}</span>`);
	}

	return nothing;
}

function parseDisplayMode3(property: ItemProperty): string;
function parseDisplayMode3<T>(property: ItemProperty, mapFn: (val: string) => T): Array<T | string>;
function parseDisplayMode3<T>(property: ItemProperty, mapFn?: (val: string) => T): Array<T | string> | string {
	if (property.displayMode !== 3) {
		throw new Error(`Expected displayMode 3, got ${property.displayMode}`);
	}

	const result = property.name.split(/\{(\d+)\}/g).map((part, index) => {
		if (index % 2 === 0) {
			return part;
		}

		const value = property.values[parseInt(part)]?.[0];
		if (value == null) {
			return part;
		}

		return mapFn ? mapFn(value) : value;
	});

	return mapFn ? result : result.join('');
}

console.log(
	parseDisplayMode3(
		{
			displayMode: 3,
			name: 'Weapon Range: {0}',
			type: 14,
			values: [['1.3', 0]],
		},
		value => html`<span class="value">${value}</span>`
	)
);

// displayMode 0 - with. If value, with :, if no, nothing
/* 
{ "displayMode": 0, "name": "Attack, Totem, AoE, Slam, Melee", "values": [] },
{ "displayMode": 0, "name": "Level", "type": 5, "values": [["17", 0]] },
{ "displayMode": 0, "name": "Cost", "values": [["10 Mana", 0]] },
{ "displayMode": 0, "name": "Attack Speed", "values": [["90% of base", 0]] },
{ "displayMode": 0, "name": "Attack Damage", "values": [["157.2% of base", 0]] },
{ "displayMode": 0, "name": "Effectiveness of Added Damage", "values": [["157%", 0]] }
 */
/*  displayMode 1 -
{ "displayMode": 1, "name": "Str", "type": 63, "values": [["142", 0]] }
becomes 142 Str, where 142 - white, Str - grey
*/

/* "displayMode": 2
"additionalProperties": [
	{
		"displayMode": 2,
		"name": "Experience",
		"progress": 0.47,
		"type": 20,
	    "values": [["7660059/16159983", 0]]
	}
],
*/
