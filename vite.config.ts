import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	// build: {
	// 	lib: {
	// 		formats: ['es'],
	// 		// Could also be a dictionary or array of multiple entry points
	// 		entry: [
	// 			resolve(import.meta.dirname, 'src/elements/poe-item.ts'),
	// 			resolve(import.meta.dirname, 'src/elements/poe-stash-tab.ts'),
	// 		],
	// 	},
	// 	rollupOptions: {},
	// },
	plugins: [dts()],
});
