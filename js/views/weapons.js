import { renderList } from './list.js';
import { WEAPONS, GROUPS, SIF_IDS } from '../data/weapons.js';
import { esc } from '../util.js';

const CYCLES = [['ng', 'NG'], ['ng1', 'NG+'], ['ng2', 'NG++']];
const DEFAULT_PLAN = { 'w-greatshield-artorias': 'ng', 'w-gs-artorias-cursed': 'ng1', 'w-gs-artorias-true': 'ng2' };
const NAME = Object.fromEntries(WEAPONS.map(w => [w.id, w.name]));

export function renderWeapons(el, store) {
  const plan = () => ({ ...DEFAULT_PLAN, ...(store.get().settings.sifPlan || {}) });
  const p = plan();
  const head = `
    <div class="panel sif">
      <h3>Almas de Sif — um uso por ciclo</h3>
      <p>Sif tem uma alma por ciclo e são três armas dela: é preciso chegar ao NG++. Planeje qual arma fazer em cada ciclo.</p>
      <div class="sifrow">${SIF_IDS.map(id => `
        <label>${esc(NAME[id])}
          <select data-sif="${id}">${CYCLES.map(([k, l]) => `<option value="${k}" ${p[id] === k ? 'selected' : ''}>${l}</option>`).join('')}</select>
        </label>`).join('')}
      </div>
      <p id="sifmsg" class="msg" role="alert"></p>
      <p class="note">Dica: armas de alma podem ser rebaixadas para +10 e reaproveitadas. Ghost Blade e Titanite Catch Pole não são necessários.</p>
    </div>`;

  renderList(el, store, {
    key: 'weapons',
    title: "Armas Raras — Knight's Honor",
    lead: 'Todas as armas e escudos devem estar no mesmo personagem. Base de forja: arma +10 + alma, no Giant Blacksmith.',
    items: WEAPONS, groups: GROUPS, tags: GROUPS, head,
    bind(root) {
      const check = () => {
        const vals = [...root.querySelectorAll('[data-sif]')].map(s => s.value);
        root.querySelector('#sifmsg').textContent = new Set(vals).size < vals.length
          ? 'Ciclo repetido: só há uma alma de Sif por ciclo.' : '';
      };
      root.querySelectorAll('[data-sif]').forEach(s => s.addEventListener('change', () => {
        store.setSetting('sifPlan', { ...plan(), [s.dataset.sif]: s.value });
        check();
      }));
      check();
    },
  });
}
