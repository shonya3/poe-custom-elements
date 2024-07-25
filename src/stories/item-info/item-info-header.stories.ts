import { html } from 'lit';
import { PoeItem } from '../../poe.types';
import { Meta } from '@storybook/web-components';
import { PoeItemInfoHeaderElement } from '../../elements/item-info/poe-item-info-header';
import '../../elements/item-info/poe-item-info-header';
import { influence } from '../../../jsons/influence';

export default {
	title: 'Components/item-info/poe-item-info-header',
	component: 'poe-item-info-header',
	render: (args: { item: PoeItem }) => html`<poe-item-info-header .item=${args.item}></poe-item-info-header>`,
} satisfies Meta<PoeItemInfoHeaderElement>;

export const Influence = {
	args: { item: influence },
};
