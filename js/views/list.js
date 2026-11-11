// Lista filtrável genérica (conquistas, armas, magias, aprimoramentos).
// cfg: { key, title, lead, items, groups:{id:label}, tags?:{id:label}, auto?(checks)->bool, head?:html, bind?(el,store,draw) }
// item: { id, name, nameSafe?, group, tag?, safe, full?, meta?, warn?, verify?, auto?, link? }
import { esc, norm } from '../util.js';

const STATUS = [['todos', 'Todos'], ['pend', 'Pendentes'], ['feitos', 'Concluídos']];

export function renderList(el, store, cfg) {
  const saved = store.get().settings.filters?.[cfg.key] || {};
  const f = { q: '', g: 'todos', s: 'todos', ...saved };
  const opts = (list, cur) => list.map(([k, l]) => `<option value="${esc(k)}" ${k === cur ? 'selected' : ''}>${esc(l)}</option>`).join('');

  el.innerHTML = `
    <h2>${esc(cfg.title)}</h2>
    <p class="lead">${esc(cfg.lead)}</p>
    ${cfg.head || ''}
    <div class="tools panel">
      <input type="search" id="q" placeholder="Buscar…" aria-label="Buscar" value="${esc(f.q)}">
      <select id="g" aria-label="Categoria">${opts([['todos', 'Todas as categorias'], ...Object.entries(cfg.groups)], f.g)}</select>
      <select id="s" aria-label="Status">${opts(STATUS, f.s)}</select>
      <span id="sum" class="cnt" aria-live="polite"></span>
    </div>
    <ul class="rows panel" id="rows"></ul>`;

  const isOn = (it, checks) => (it.auto ? cfg.auto(checks) : !!checks[it.id]);

  function draw() {
    const { checks, settings } = store.get();
    const sp = settings.spoilerFree;
    const shown = it => (sp || !it.full ? it.safe : it.full);
    const nm = it => (sp && it.nameSafe ? it.nameSafe : it.name);
    const vis = cfg.items.filter(it =>
      (f.g === 'todos' || it.group === f.g) &&
      (!f.q || norm(`${nm(it)} ${shown(it)} ${it.meta || ''}`).includes(norm(f.q))) &&
      (f.s === 'todos' || (f.s === 'feitos') === isOn(it, checks)));
    const total = cfg.items.filter(it => isOn(it, checks)).length;
    el.querySelector('#sum').textContent = `${vis.length} exibidos · ${total}/${cfg.items.length} concluídos`;
    el.querySelector('#rows').innerHTML = vis.map(it => `
      <li class="${it.warn ? 'warn' : ''}"><label>
        <input type="checkbox" data-id="${esc(it.id)}" ${isOn(it, checks) ? 'checked' : ''} ${it.auto ? 'disabled' : ''}>
        <span class="tag ${esc(it.tag || '')}">${esc(cfg.tags?.[it.tag] || cfg.groups[it.group] || '')}</span>
        <span class="txt"><b>${esc(nm(it))}</b> ${esc(shown(it))}
          ${it.meta ? `<small class="meta">${esc(it.meta)}</small>` : ''}
          ${it.verify ? ' <span class="vf" title="Dado ainda não conferido contra o jogo">verificar</span>' : ''}
          ${it.link ? ` <a href="${esc(it.link[0])}">${esc(it.link[1])}</a>` : ''}</span>
      </label></li>`).join('') || '<li class="empty">Nada encontrado.</li>';
  }

  const keep = () => store.setSetting('filters', { ...(store.get().settings.filters || {}), [cfg.key]: f });
  el.querySelector('#q').oninput = e => { f.q = e.target.value; keep(); draw(); };
  el.querySelector('#g').onchange = e => { f.g = e.target.value; keep(); draw(); };
  el.querySelector('#s').onchange = e => { f.s = e.target.value; keep(); draw(); };
  el.onchange = e => {
    const cb = e.target.closest('input[data-id]');
    if (!cb) return;
    store.set(cb.dataset.id, cb.checked);
    draw();
  };
  cfg.bind?.(el, store, draw);
  draw();
}
