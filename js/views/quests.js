import { QUESTS, RULES, stepId } from '../data/quests.js';
import { esc, norm } from '../util.js';

const closed = new Set();

export function renderQuests(el, store) {
  const { checks, settings } = store.get();
  const sf = settings.spoilerFree;
  const text = x => (sf || !x.full ? x.safe : x.full);

  el.innerHTML = `
    <h2>Questlines de NPCs</h2>
    <p class="lead">Passos em ordem de aparição. ⚠ = ação que pode travar ou encerrar a quest. Fonte: guia da comunidade (Steam #2100008150), que tem pontos contestados, marcados <span class="vf">verificar</span>.</p>
    <section class="panel sif"><h3>Regras gerais</h3><ul class="plain">${RULES.map(r => `<li>${esc(r)}</li>`).join('')}</ul></section>
    <div class="tools panel"><input type="search" id="qs" placeholder="Buscar NPC ou passo…" aria-label="Buscar"><span id="qsum" class="cnt"></span></div>
    <div id="qlist">${QUESTS.map((q, n) => `
      <details class="area panel" data-q="${q.id}" ${closed.has(q.id) ? '' : 'open'}>
        <summary><span class="num">${n + 1}</span>${esc(q.npc)}<span class="cnt"></span></summary>
        <p class="note qwhere">${esc(q.where)}</p>
        <ul>${q.steps.map(x => `
          <li class="${x.warn ? 'warn' : ''}" data-t="${esc(norm(q.npc + ' ' + text(x)))}"><label>
            <input type="checkbox" data-id="${stepId(q, x)}" ${checks[stepId(q, x)] ? 'checked' : ''}>
            <span class="txt">${esc(text(x))}${x.verify ? ' <span class="vf" title="Ponto contestado ou não conferido">verificar</span>' : ''}</span>
          </label></li>`).join('')}</ul>
      </details>`).join('')}</div>`;

  const dets = [...el.querySelectorAll('details')];
  const count = d => {
    const b = d.querySelectorAll('input[data-id]');
    d.querySelector('.cnt').textContent = `${[...b].filter(i => i.checked).length}/${b.length}`;
  };
  const total = () => {
    const b = el.querySelectorAll('input[data-id]');
    el.querySelector('#qsum').textContent = `${[...b].filter(i => i.checked).length}/${b.length} passos`;
  };
  dets.forEach(d => { count(d); d.addEventListener('toggle', () => (d.open ? closed.delete(d.dataset.q) : closed.add(d.dataset.q))); });
  total();

  el.querySelector('#qs').oninput = e => {
    const q = norm(e.target.value);
    dets.forEach(d => {
      let any = false;
      d.querySelectorAll('li').forEach(li => { const ok = !q || li.dataset.t.includes(q); li.hidden = !ok; any ||= ok; });
      d.hidden = !any;
      if (q && any) d.open = true;
    });
  };
  el.onchange = e => {
    const cb = e.target.closest('input[data-id]');
    if (!cb) return;
    store.set(cb.dataset.id, cb.checked);
    count(cb.closest('details')); total();
  };
}
