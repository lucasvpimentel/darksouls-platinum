import { renderList } from './list.js';
import { TROPHIES, GROUPS, TYPES, TROPHY_IDS } from '../data/trophies.js';

export const renderTrophies = (el, store) => renderList(el, store, {
  key: 'trophies',
  title: 'Matriz das 41 Conquistas',
  lead: 'Marque conforme conquistar. A Platina é concedida automaticamente quando os outros 40 estiverem completos. ⚠ = ação que precisa vir antes de outra.',
  items: TROPHIES, groups: GROUPS, tags: TYPES,
  auto: checks => TROPHY_IDS.every(id => checks[id]),
});
