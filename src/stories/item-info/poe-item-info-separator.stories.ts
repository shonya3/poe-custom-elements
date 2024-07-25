import { Meta } from '@storybook/web-components';
import { PoeItemInfoSeparatorElement } from '../../elements/item-info/poe-item-info-separator';
import { html } from 'lit';
import { FRAME_KIND_VARIANTS, FrameKind } from '../../poe.types';
import '../../elements/item-info/poe-item-info-separator';

export default {
	title: 'Components/item-info/poe-item-info-separator',
	component: 'poe-item-info-separator',
	args: {
		kind: FRAME_KIND_VARIANTS[0],
	},
	argTypes: {
		kind: {
			control: 'select',
			options: FRAME_KIND_VARIANTS.filter(k => k !== 'divination'),
		},
	},
	render: (args: { kind: FrameKind }) => html`<poe-item-info-separator kind=${args.kind}></poe-item-info-separator>`,
} satisfies Meta<PoeItemInfoSeparatorElement>;

export const Default = {};
