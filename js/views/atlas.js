import { AREAS, EDGES, ROUTE_FOR, DSMAP_URL, byId, neighbors } from '../data/atlas.js';
import { ROUTE } from '../data/route.js';
import { panzoom } from '../panzoom.js';
import { esc } from '../util.js';

const W = 130, H = 40, NS = 'http://www.w3.org/2000/svg';
const dsBtn = (cls = '') => `<a class="btn ${cls}" href="${DSMAP_URL}" target="_blank" rel="noopener noreferrer">🌐 Abrir Mapa 3D Interativo de Lordran</a>`;
const CAPTION = 'Visualizador 3D em tempo real com modelos de colisão e posicionamento espacial de Lordran (dsmap.link, site externo).';

/* ---------- Diagrama SVG ---------- */
function clip(from, to) { // ponto na borda do retângulo de `from` na direção de `to`
  const dx = to.x - from.x, dy = to.y - from.y;
  const t = Math.min(dx ? (W / 2) / Math.abs(dx) : Infinity, dy ? (H / 2) / Math.abs(dy) : Infinity);
  return [from.x + dx * t, from.y + dy * t];
}
const words = n => { const p = n.split(' '); if (n.length < 17) return [n]; const m = Math.ceil(p.length / 2); return [p.slice(0, m).join(' '), p.slice(m).join(' ')]; };

function diagramSvg() {
  const edges = EDGES.map((x, i) => {
    const A = byId[x.a], B = byId[x.b], [x1, y1] = clip(A, B), [x2, y2] = clip(B, A);
    const cls = ['edge', x.k ? 'key' : '', x.g ? 'gate' : ''].join(' ');
    return `<g data-edge="${i}" data-a="${x.a}" data-b="${x.b}" class="${cls}">
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${x.d ? 'marker-end="url(#arrow)"' : ''}/>
      ${x.k ? `<text x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2 + 5}" text-anchor="middle">🗝️</text>` : ''}
      ${x.g ? `<text x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2 - 6}" text-anchor="middle" class="gl">Lordvessel</text>` : ''}
      <title>${esc(`${A.name} ↔ ${B.name}: ${x.n}`)}</title></g>`;
  }).join('');
  const nodes = AREAS.map(n => {
    const ls = words(n.name);
    return `<g class="node ${n.dead ? 'dead' : ''} ${n.gated ? 'gated' : ''}" data-id="${n.id}" tabindex="0" role="button" aria-label="${esc(n.name)}${n.dead ? ' (beco sem saída)' : ''}">
      <rect x="${n.x - W / 2}" y="${n.y - H / 2}" width="${W}" height="${H}" rx="3"/>
      <rect class="inner" x="${n.x - W / 2 + 3}" y="${n.y - H / 2 + 3}" width="${W - 6}" height="${H - 6}" rx="2"/>
      ${ls.map((l, i) => `<text x="${n.x}" y="${n.y + (ls.length === 1 ? 4 : i * 13 - 2)}" text-anchor="middle">${esc(l)}</text>`).join('')}
    </g>`;
  }).join('');
  return `<svg viewBox="0 0 1000 720" xmlns="${NS}" role="group" aria-label="Diagrama de conexões de Lordran">
    <defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>
    ${edges}${nodes}</svg>`;
}

function focusGraph(svg, id) {
  const near = new Set(id ? [id, ...neighbors(id).map(x => x.other.id)] : []);
  svg.classList.toggle('focusing', !!id);
  svg.querySelectorAll('.node').forEach(g => g.classList.toggle('on', near.has(g.dataset.id)));
  svg.querySelectorAll('.edge').forEach(g => g.classList.toggle('on', g.dataset.a === id || g.dataset.b === id));
}

function mountDiagram(host, store) {
  host.innerHTML = `
    <div class="legend"><span><i class="lg key"></i>🗝️ chave/atalho</span><span><i class="lg gate"></i>névoa (Lordvessel)</span><span><i class="lg dead"></i>beco sem saída</span><span>→ mão única</span></div>
    <div class="stage diagram panel" id="dstage"><div id="dpz">${diagramSvg()}</div>
      <div class="zbtns"><button data-z="in" aria-label="Ampliar">＋</button><button data-z="out" aria-label="Reduzir">－</button><button data-z="reset" aria-label="Centralizar">⟲</button></div>
    </div>
    <p class="note">Passe o mouse ou foque um nó para realçar as conexões. Clique para abrir o mapa. Arraste, role ou use pinça para navegar.</p>`;
  const stage = host.querySelector('#dstage'), svg = host.querySelector('svg');
  const pz = panzoom(stage, host.querySelector('#dpz'));
  stage.querySelector('.zbtns').onclick = e => { const z = e.target.dataset.z; if (z === 'reset') pz.reset(); else if (z) pz.zoomBy(z === 'in' ? 1.3 : 1 / 1.3); };
  const idOf = e => e.target.closest('.node')?.dataset.id;
  svg.addEventListener('pointerover', e => { if (e.pointerType !== 'touch') focusGraph(svg, idOf(e) || null); });
  svg.addEventListener('pointerleave', () => focusGraph(svg, null));
  svg.addEventListener('focusin', e => focusGraph(svg, idOf(e) || null));
  svg.addEventListener('focusout', () => focusGraph(svg, null));
  svg.addEventListener('click', e => { const id = idOf(e); if (id) { focusGraph(svg, id); openMap(id, host._store); } });
  svg.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { const id = idOf(e); if (id) { e.preventDefault(); openMap(id, host._store); } } });
}

/* ---------- Grade e matriz ---------- */
function mountGrid(host) {
  host.innerHTML = `<div class="thumbs">${AREAS.map(a => `
    <button class="thumb panel" data-open="${a.id}">
      <img loading="lazy" alt="" src="assets/maps/${a.id}.jpg" onerror="this.remove()">
      <span class="emb" aria-hidden="true">${a.dead ? '⛔' : '🗺️'}</span><b>${esc(a.name)}</b>
    </button>`).join('')}</div>`;
}

function mountMatrix(host) {
  host.innerHTML = `<div class="tablewrap panel"><table class="matrix"><thead><tr><th>Área</th><th>Conexões</th><th>Tipo / requisito</th></tr></thead><tbody>
    ${AREAS.map(a => `<tr><th scope="row">${esc(a.name)}${a.dead ? ' <em class="dead">beco sem saída</em>' : ''}</th>
      <td>${neighbors(a.id).map(x => esc(x.other.name)).join(' · ')}</td>
      <td>${neighbors(a.id).map(x => `<div><small>${esc(x.other.name)}:</small> ${esc(x.n)}</div>`).join('')}</td></tr>`).join('')}
    </tbody></table></div>
    <p class="note">Matriz montada a partir do briefing do projeto; algumas rotas e chaves ainda não foram conferidas contra o jogo.</p>`;
}

const TABS = { diagrama: 'Diagrama de Conexões', mapas: 'Mapas Individuais', matriz: 'Matriz de Conexões' };

export function renderAtlas(el, store) {
  let tab = store.get().settings.atlasTab;
  if (!TABS[tab]) tab = 'diagrama';
  el.innerHTML = `
    <h2>🗺️ Atlas de Lordran</h2>
    <div class="atlashead">${dsBtn('primary')}<small class="note">${CAPTION}</small></div>
    <div class="tabs" role="tablist">${Object.entries(TABS).map(([k, l]) => `<button role="tab" class="tab" data-tab="${k}" aria-selected="${k === tab}">${l}</button>`).join('')}</div>
    <div id="atlasbody"></div>`;
  const body = el.querySelector('#atlasbody');
  body._store = store;
  ({ diagrama: mountDiagram, mapas: mountGrid, matriz: mountMatrix })[tab](body, store);
  el.onclick = e => {
    const t = e.target.closest('[data-tab]');
    if (t) { store.setSetting('atlasTab', t.dataset.tab); renderAtlas(el, store); return; }
    const o = e.target.closest('[data-open]');
    if (o) openMap(o.dataset.open, store);
  };
}

/* ---------- Modal do mapa ---------- */
let dlg, pz;
function ensureDialog() {
  if (dlg) return dlg;
  dlg = document.createElement('dialog');
  dlg.className = 'mapdlg panel';
  dlg.setAttribute('aria-labelledby', 'mt');
  dlg.innerHTML = `
    <header><h2 id="mt"></h2>
      <div class="mtools">
        <button data-z="in" aria-label="Ampliar">＋</button><button data-z="out" aria-label="Reduzir">－</button>
        <button data-z="reset" aria-label="Centralizar">⟲</button><button data-fs aria-label="Tela cheia">⛶</button>
        <label class="check"><input type="checkbox" id="msec"> Segredos</label>
        <button data-close aria-label="Fechar">✕</button>
      </div></header>
    <div class="stage" id="mstage"><div id="mpz"></div></div>
    <footer>${dsBtn()}<small class="note">${CAPTION}</small></footer>`;
  document.body.append(dlg);
  pz = panzoom(dlg.querySelector('#mstage'), dlg.querySelector('#mpz'));
  dlg.addEventListener('click', e => {
    if (e.target === dlg || e.target.closest('[data-close]')) return dlg.close();
    const z = e.target.closest('[data-z]')?.dataset.z;
    if (z === 'reset') pz.reset(); else if (z) pz.zoomBy(z === 'in' ? 1.3 : 1 / 1.3);
    if (e.target.closest('[data-fs]')) {
      const st = dlg.querySelector('#mstage');
      if (document.fullscreenElement) document.exitFullscreen(); else st.requestFullscreen?.();
    }
  });
  dlg.querySelector('#msec').addEventListener('change', e => dlg.classList.toggle('show-secrets', e.target.checked));
  return dlg;
}

function placard(id, store) {
  const area = byId[id], { checks } = store.get();
  const route = ROUTE.find(r => r.id === (ROUTE_FOR[id] || id));
  const items = route ? route.items.map(it => {
    const secret = it.type === 'tail' || !!it.full;
    return `<li class="${secret ? 'secret' : ''}">${checks[it.id] ? '✔' : '☐'} ${esc(it.safe)}</li>`;
  }).join('') : '';
  return `<div class="placard"><h3>${esc(area.name)}</h3>
    ${area.dead ? '<p class="deadtag">⛔ Beco sem saída</p>' : ''}${area.gated ? '<p class="deadtag">Exige o Lordvessel</p>' : ''}
    <h4>Conexões</h4><ul>${neighbors(id).map(x => `<li><b>${esc(x.other.name)}</b> — ${esc(x.n)}</li>`).join('')}</ul>
    ${items ? `<h4>Rota</h4><ul class="rl">${items}</ul><p class="note">Itens de corte de cauda e variantes são “segredos” (botão no topo).</p>` : ''}
    <p class="note">Sem imagem local: coloque <code>assets/maps/${id}.jpg</code> para exibir o mapa cartográfico aqui.</p></div>`;
}

export function openMap(id, store) {
  if (!byId[id]) return;
  const d = ensureDialog(), area = byId[id];
  d.querySelector('#mt').textContent = area.name;
  const sec = d.querySelector('#msec'); sec.checked = !store.get().settings.spoilerFree;
  d.classList.toggle('show-secrets', sec.checked);
  const host = d.querySelector('#mpz');
  host.innerHTML = `<img class="mapimg" alt="Mapa de ${esc(area.name)}" src="assets/maps/${id}.jpg">${placard(id, store)}`;
  const img = host.querySelector('img'), card = host.querySelector('.placard');
  card.hidden = true;
  let triedPng = false;
  img.addEventListener('load', () => { card.hidden = true; });
  img.addEventListener('error', () => {
    if (!triedPng) { triedPng = true; img.src = `assets/maps/${id}.png`; return; }
    img.remove(); card.hidden = false; // fallback: planta vetorial com instruções da área
  });
  pz.reset();
  if (!d.open) d.showModal();
}
