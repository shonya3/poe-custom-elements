import type { Meta } from '@storybook/web-components';
import { PoeStashTabElement } from '../elements/poe-stash-tab';
import { html } from 'lit';
import '../elements/poe-stash-tab';
import { quadStd } from '../../jsons/tabs/quadStd';
import { divination } from '../../jsons/tabs/divination';

export default {
	tags: ['autodocs'],
	title: 'Components/poe-stash-tab',
	component: 'poe-stash-tab',
} satisfies Meta<PoeStashTabElement>;

export const Quad = {
	render() {
		return html`<poe-stash-tab .tab=${quadStd}></poe-stash-tab>`;
	},
};

export const Divination = {
	render() {
		return html`<poe-stash-tab .tab=${divination}></poe-stash-tab>`;
	},
};
