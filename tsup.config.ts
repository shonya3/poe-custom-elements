import { defineConfig } from 'tsup';

export default defineConfig({
	name: 'poe-custom-elements',
	format: ['esm'],
	dts: {
		resolve: true,
	},
	entry: [
		'./src/elements/poe-stash-tab.ts',
		'./src/elements/item-info/poe-item-info.ts',
		'./src/poe.types.ts',
		'./src/elements/poe-item.ts',
	],
	publicDir: true,
	sourcemap: true,
});
