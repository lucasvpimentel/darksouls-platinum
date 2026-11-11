import { renderList } from './list.js';
import { SORCERIES, PYROMANCIES, MIRACLES, TABS, SORC_GROUPS, PYRO_GROUPS, MIRACLE_GROUPS } from '../data/spells.js';
import { UPGRADES, GROUPS as UP_GROUPS } from '../data/upgrades.js';

const SETS = {
  sorc: [SORCERIES, SORC_GROUPS, 'Feitiços — Wisdom of a Sage'],
  pyro: [PYROMANCIES, PYRO_GROUPS, 'Piromancias — Bond of a Pyromancer'],
  miracle: [MIRACLES, MIRACLE_GROUPS, 'Milagres — Prayer of a Maiden'],
};

export function renderMagic(el, store) {
  let tab = store.get().settings.magicTab;
  if (!SETS[tab]) tab = 'sorc';
  el.innerHTML = `<div class="tabs" role="tablist">${Object.entries(TABS).map(([k, l]) =>
    `<button role="tab" class="tab" data-tab="${k}" aria-selected="${k === tab}">${l}</button>`).join('')}</div><div id="tabbody"></div>`;
  const [items, groups, title] = SETS[tab];
  renderList(el.querySelector('#tabbody'), store, {
    key: 'magic-' + tab, title, items, groups,
    lead: '⚠ marca itens com risco de perda ou ordem obrigatória. Todos os itens devem estar no mesmo personagem.',
    tags: { sorc: 'Feitiço', pyro: 'Piromancia', miracle: 'Milagre' },
  });
  el.onclick = e => {
    const b = e.target.closest('[data-tab]');
    if (!b) return;
    store.setSetting('magicTab', b.dataset.tab);
    renderMagic(el, store);
  };
}

export const renderUpgrades = (el, store) => renderList(el, store, {
  key: 'upgrades',
  title: 'Matriz de Aprimoramentos Máximos',
  lead: 'Marcar aqui também marca o troféu correspondente em Conquistas. Brasa + ferreiro + material final.',
  items: UPGRADES, groups: UP_GROUPS, tags: UP_GROUPS,
});
