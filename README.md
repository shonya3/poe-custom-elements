# poe-custom-elements

Path of Exile custom elements

```bash
npm install poe-custom-elements
```

## Usage

Here is an example with a stash tab

First, you need to open node_modules/poe-custom-elements and copy

-   poe-images folder
-   fontin.woff
    to your public files. (public folder for vite)

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
