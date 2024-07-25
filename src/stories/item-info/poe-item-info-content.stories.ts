import { Meta } from '@storybook/web-components';
import { PoeItemInfoContentElement } from '../../elements/item-info/poe-item-info-content';
import { influence } from '../../../jsons/influence';
import { PoeItem } from '../../poe.types';
import { html } from 'lit';
import '../../elements/item-info/poe-item-info-content';

export default {
	title: 'Components/item-info/poe-item-info-content',
	component: 'poe-item-info-content',
	render: (args: { item: PoeItem }) => html`<poe-item-info-content .item=${args.item}></poe-item-info-content>`,
} satisfies Meta<PoeItemInfoContentElement>;

export const Default = {
	args: { item: influence },
};
