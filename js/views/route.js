import { ROUTE } from '../data/route.js';

const TYPE = { boss: 'Chefe', tail: 'Cauda', key: 'Chave', covenant: 'Pacto', npc: 'NPC', item: 'Item' };
const closed = new Set(); // cards recolhidos sobrevivem a re-render
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function count(det) {
  const boxes = det.querySelectorAll('input[data-id]');
  det.querySelector('.cnt').textContent = `${[...boxes].filter(b => b.checked).length}/${boxes.length}`;
}

export function renderRoute(el, store) {
  const { checks, settings } = store.get();
  const text = it => (settings.spoilerFree || !it.full ? it.safe : it.full);

  el.innerHTML = `
    <h2>Rota Otimizada de Mapas</h2>
    <p class="lead">Áreas em ordem cronológica. ⚠ marca pontos sem retorno ou ações que precisam vir antes de outra.</p>
    ${ROUTE.map((a, n) => `
      <details class="area panel" id="area-${a.id}" ${closed.has(a.id) ? '' : 'open'}>
        <summary><span class="num">${n + 1}</span>${esc(a.area)}<span class="cnt"></span></summary>
        <ul>${a.items.map(it => `
          <li class="${it.warn ? 'warn' : ''}"><label>
            <input type="checkbox" data-id="${it.id}" ${checks[it.id] ? 'checked' : ''}>
            <span class="tag ${it.type}">${TYPE[it.type] || it.type}</span>
            <span class="txt">${esc(text(it))}${it.verify ? ' <span class="vf" title="Dado ainda não conferido contra o jogo">verificar</span>' : ''}</span>
          </label></li>`).join('')}
        </ul>
      </details>`).join('')}`;

  el.querySelectorAll('details').forEach(d => {
    count(d);
    d.addEventListener('toggle', () => (d.open ? closed.delete(d.id.slice(5)) : closed.add(d.id.slice(5))));
  });
  el.onchange = e => {
    const cb = e.target.closest('input[data-id]');
    if (!cb) return;
    store.set(cb.dataset.id, cb.checked);
    count(cb.closest('details'));
  };
}
