import { css, CSSResult } from 'lit';

export const poeColorsCssVariables: CSSResult = css`
	--flavour-text-color: rgba(167, 90, 27, 1);
	--item-normal: 0, 0%, 78%;
	--item-rare: 60, 100%, 73%;
	--item-magic: 240, 100%, 77%;
	--item-unique-contrast: 25, 63%, 48%;
	--item-unique: 26, 65%, 42%;
	--item-gem: 177, 72%, 37%;
	--item-relic: 0, 0%, 78%;
	--item-currency: 42, 19%, 59%;
	--item-prophecy: 275, 100%, 65%;
	--item-divination: 0, 0%, 50%;
	--item-keystone: 46, 52%, 74%;
	--item-explicit: 240, 100%, 77%;
	--item-implicit: var(--item-explicit);
	--item-crafted: 240, 100%, 85%;
	--item-enchanted: var(--item-crafted);
	--item-fractured: 44, 26%, 51%;
	--item-corrupted: 0, 100%, 41%;
	--item-scourge: 20, 100%, 57%;
	--item-physical: 0, 0%, 58%;
	--item-fire: 0, 100%, 29%;
	--item-cold: 210, 46%, 39%;
	--item-lightning: 51, 100%, 50%;
	--item-chaos: 322, 73%, 47%;
	--item-augmented: rgb(138, 138, 255);
	--coolgrey-1000: 206, 24%, 7%;
	--item-necropolis: 44.35, 39%, 76.86%;
`;
