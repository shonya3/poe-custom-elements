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
		'./src/elements/divination-card/poe-divination-card.ts',
		'./src/elements/poe-item-card.ts',
		'./src/lib/base_path.ts',
	],
	publicDir: true,
	sourcemap: true,
	clean: true,
});
