import { html, render } from 'lit';
import json from '../jsons/items.json';
import quadJson from '../jsons/QuadStash.json';
// import quadStdJson from '../jsons/QuadStashStd.json';
import './elements/poe-item';
import './elements/poe-stash-tab';
import { PoeItem, TabWithItems } from './poe.types';
const items = json.items as PoeItem[];
const quad: TabWithItems = quadJson;
// const quadStd: TabWithItems = quadStdJson;

const h = html`
	<poe-stash-tab .tab=${quad}></poe-stash-tab>
	<ul>
		${items.slice().map(item => html`<poe-item .item=${item}></poe-item>`)}
	</ul>
`;

render(h, document.body);
