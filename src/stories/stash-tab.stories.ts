import type { Meta } from '@storybook/web-components';
import { PoeStashTabElement } from '../elements/poe-stash-tab';
import { html } from 'lit';
import '../elements/poe-stash-tab';
import { quadStd } from '../../jsons/tabs/quadStd';
import { divination } from '../../jsons/tabs/divination';
import { TabWithItems } from '../poe.types';
import premium from '../../jsons/PremiumStash.json';
import { essence } from '../../jsons/tabs/essence';
import { currencyTab } from '../../jsons/tabs/currencyTab';
import { blight } from '../../jsons/tabs/blight';
import { fragments } from '../../jsons/tabs/myfragments';

export default {
	tags: ['autodocs'],
	title: 'Components/poe-stash-tab',
	component: 'poe-stash-tab',
	render: (args: { tab: TabWithItems }) => html`<poe-stash-tab .tab=${args.tab}></poe-stash-tab>`,
} satisfies Meta<PoeStashTabElement>;

export const Quad = {
	args: { tab: quadStd },
};
export const Premium = {
	args: { tab: premium },
};
export const Essence = {
	args: { tab: essence },
};
export const Currency = {
	args: { tab: currencyTab },
};
export const Blight = {
	args: { tab: blight },
};
export const Fragment = {
	args: { tab: fragments },
};
export const Divination = {
	args: { tab: divination },
};
export const Normal = {
	args: { tab: premium },
};
