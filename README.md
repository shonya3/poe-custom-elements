# poe-custom-elements

Path of Exile custom elements

```bash
npm install poe-custom-elements
```

## Usage

The syntax is kept fairly simple. Here's a basic example of a regular
conversation:

```js
import 'poe-custom-elements/stash-tab.js';
/* 
 JS object of stash tab from Poe API
 https://www.pathofexile.com/developer/docs/reference#stashes-get
 Check TabWithItems, PoeItem .d.ts types file 
*/
import quad from './QuadStashStd.json';

const el = document.createElement('poe-stash-tab');
el.tab = quad;
document.body.append(el);
```
