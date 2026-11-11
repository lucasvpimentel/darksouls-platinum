import { META, MEMES } from '../data/builds.js';
import { SLOTS, PRESETS, calc } from '../sim.js';
import { esc } from '../util.js';

const TABS = { meta: '⚔️ Builds Meta & Progressão', meme: '🎭 Memebuilds & Clássicos', sim: '📊 Simulador de Carga' };
const NOTE = '<p class="lead"><span class="vf">verificar</span> Atributos e itens vêm do briefing do projeto e não foram conferidos contra o jogo. O simulador usa pesos conferidos (Fextralife).</p>';
const li = a => `<ul>${a.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;

const metaHtml = () => NOTE + META.map(b => `
  <details class="area panel build" ${b.id === 'quality' ? 'open' : ''}>
    <summary><span class="num">⚔</span>${esc(b.name)}<span class="cnt">SL ${esc(b.sl)}</span></summary>
    <div class="bbody"><h4>Classe inicial</h4><p>${esc(b.cls)}</p>
      <h4>Atributos</h4><p>${esc(b.stats)}</p>
      <h4>Armas, escudos e itens-chave</h4><p>${esc(b.gear)}</p>
      <h4>Anéis</h4><p>${esc(b.rings)}</p><h4>Armadura e magias</h4><p>${esc(b.armor)}</p>
      <h4>Estilo de jogo</h4><p>${esc(b.play)}</p></div>
  </details>`).join('');

const memeHtml = () => NOTE + MEMES.map(m => `
  <details class="area panel build"><summary><span class="num">🎭</span>${esc(m.name)}<span class="cnt">${m.quote !== '—' ? '“' + esc(m.quote.slice(0, 28)) + (m.quote.length > 28 ? '…' : '') + '”' : ''}</span></summary>
    <div class="bbody"><h4>Origem</h4><p>${esc(m.origin)}</p>
      ${m.quote !== '—' ? `<p><em>“${esc(m.quote)}”</em></p>` : ''}
      <h4>Equipamento</h4>${li(m.gear)}<h4>Atributos</h4><p>${esc(m.stats)}</p><h4>A piada</h4><p>${esc(m.joke)}</p>
      ${m.preset ? `<button class="btn" data-preset="${m.preset}">📊 Carregar no simulador</button>` : ''}</div>
  </details>`).join('');

const CATS = { fast: ['🟢 Fast Roll', 'ok'], mid: ['🟡 Mid Roll', 'mid'], fat: ['🔴 Fat Roll', 'bad'], over: ['💀 Overburdened — não rola nem corre', 'dead'] };
const sel = (k, label) => `<label class="field">${label}<select data-k="${k}">${SLOTS[k].map(([id, n]) => `<option value="${id}">${esc(n)}</option>`).join('')}</select></label>`;

const simHtml = () => `
  <div class="panel sim"><div class="simgrid">
    ${sel('helm', 'Elmo')}${sel('chest', 'Peitoral')}${sel('gauntlets', 'Manoplas')}${sel('legs', 'Perneiras')}
    ${sel('weapon', 'Arma')}${sel('shield', 'Escudo')}
    <label class="field">Peso extra (outras armas/escudos)<input type="number" min="0" step="0.1" data-k="extra" value="0"></label>
    <label class="check"><input type="checkbox" data-k="havel"> Havel's Ring (+50%)</label>
    <label class="check"><input type="checkbox" data-k="fap"> Ring of Favor and Protection (+20%)</label>
    <label class="field span">Resistência (END): <b id="endv"></b><input type="range" min="1" max="99" data-k="end"></label>
  </div>
  <div id="simout" class="simout" aria-live="polite"></div>
  <div class="btnrow">${Object.entries(PRESETS).map(([k, p]) => `<button class="btn" data-preset="${k}">${esc(p.name)}</button>`).join('')}</div>
  </div>`;

export function renderBuilds(el, store) {
  let tab = store.get().settings.buildsTab;
  if (!TABS[tab]) tab = 'meta';
  el.innerHTML = `<h2>Central de Builds</h2><div class="tabs" role="tablist">${Object.entries(TABS).map(([k, l]) =>
    `<button role="tab" class="tab" data-tab="${k}" aria-selected="${k === tab}">${l}</button>`).join('')}</div>
    <div id="bbody">${{ meta: metaHtml, meme: memeHtml, sim: simHtml }[tab]()}</div>`;

  const body = el.querySelector('#bbody');
  const state = { ...PRESETS.quality, ...(store.get().settings.sim || {}) };
  const fields = () => body.querySelectorAll('[data-k]');
  function draw() {
    const r = calc(state), [label, cls] = CATS[r.cat];
    body.querySelector('#endv').textContent = state.end;
    body.querySelector('#simout').innerHTML = `
      <div class="badge ${cls}">${label}</div>
      <dl><dt>Carga máxima</dt><dd>${r.max.toFixed(1)}</dd><dt>Peso equipado</dt><dd>${r.weight.toFixed(1)} (${r.pct.toFixed(1)}%)</dd>
      <dt>Poise (armadura)</dt><dd>${r.poise}</dd>
      <dt>END p/ Fast Roll</dt><dd>${r.needFast ?? 'inalcançável'}</dd><dt>END p/ Mid Roll</dt><dd>${r.needMid ?? 'inalcançável'}</dd></dl>`;
  }
  function load(p) {
    Object.assign(state, p);
    fields().forEach(f => { f.type === 'checkbox' ? (f.checked = !!state[f.dataset.k]) : (f.value = state[f.dataset.k]); });
    draw();
  }
  if (tab === 'sim') {
    load({});
    body.addEventListener('input', e => {
      const k = e.target.dataset.k;
      if (!k) return;
      state[k] = e.target.type === 'checkbox' ? e.target.checked : e.target.type === 'range' || k === 'extra' ? Number(e.target.value) : e.target.value;
      store.setSetting('sim', { ...state });
      draw();
    });
  }
  el.onclick = e => {
    const t = e.target.closest('[data-tab]');
    if (t) { store.setSetting('buildsTab', t.dataset.tab); return renderBuilds(el, store); }
    const p = e.target.closest('[data-preset]');
    if (p) {
      store.setSetting('buildsTab', 'sim'); store.setSetting('sim', { ...PRESETS[p.dataset.preset] });
      renderBuilds(el, store);
    }
  };
}
