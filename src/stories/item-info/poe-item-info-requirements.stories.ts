import { Meta } from '@storybook/web-components';
import { PoeItemInfoRequirementsElement } from '../../elements/item-info/poe-item-info-requirements';
import { Requirement } from '../../poe.types';
import { html } from 'lit';
import '../../elements/item-info/poe-item-info-requirements';

export default {
	title: 'Components/item-info/poe-item-info-requirements',
	component: 'poe-item-info-requirements',
	decorators: [story => html`<div style="padding:2rem;background-color: black">${story()}</div>`],
	render: (args: { requirements: Array<Requirement> }) =>
		html`<poe-item-info-requirements .requirements=${args.requirements}></poe-item-info-requirements>`,
} satisfies Meta<PoeItemInfoRequirementsElement>;

export const Default = {
	args: {
		requirements: [
			{
				displayMode: 0,
				name: 'Level',
				suffix: '(gem)',
				type: 62,
				values: [['68', 0]],
			},
			{
				displayMode: 1,
				name: 'Str',
				suffix: '(gem)',
				type: 63,
				values: [['151', 0]],
			},
			{
				displayMode: 1,
				name: 'Dex',
				type: 64,
				values: [['68', 0]],
			},
			{
				displayMode: 1,
				name: 'Int',
				suffix: '(gem)',
				type: 65,
				values: [['39', 0]],
			},
		],
	},
};
