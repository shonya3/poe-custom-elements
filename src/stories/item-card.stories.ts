import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../elements/poe-item-card';
import { PoeItemCardElement } from '../elements/poe-item-card';
import { ifDefined } from 'lit/directives/if-defined.js';

export default {
	tags: ['autodocs'],
	title: 'Components/poe-item-card',
	component: 'poe-item-card',
	decorators: [story => html`<div style="height: 30rem">${story()}</div>`],
	args: {
		name: 'Rain of Chaos',
	},
	render: args => html`<poe-item-card name=${args.name} stack-size=${ifDefined(args.stackSize)}></poe-item-card>`,
} satisfies Meta<PoeItemCardElement>;
type Story = StoryObj<PoeItemCardElement>;

export const StackMaxed = {
	args: {
		stackSize: 8,
	},
} satisfies Story;
export const Default = {};
export const Stacksize = {
	args: {
		stackSize: 4,
	},
} satisfies Story;
