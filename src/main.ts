import './app-root';

document.body.append(document.createElement('app-root'));

import './elements/divination-card/poe-divination-card';

const card = document.createElement('poe-divination-card');
card.name = 'The Doctor';
document.body.append(card);
