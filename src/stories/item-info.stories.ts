import { html } from 'lit';
import { PoeItem } from '../poe.types';
import { Meta } from '@storybook/web-components';
import { PoeItemInfoElement } from '../elements/item-info/poe-item-info';
import { influence } from '../../jsons/influence';

export default {
	tags: ['autodocs'],
	title: 'Components/poe-item-info',
	component: 'poe-item-info',
	render: (args: { item: PoeItem }) => html`<poe-item-info .item=${args.item}></poe-item-info>`,
} satisfies Meta<PoeItemInfoElement>;

export const Default = {
	args: { item: influence },
};
