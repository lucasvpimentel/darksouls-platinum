import { TABS, TIMELINE, ORIGENS, REINOS, TRAGEDIAS, SERPENTES, NODES, LINKS } from '../data/lore.js';
import { esc } from '../util.js';

const revealed = new Set(); // revelações só valem nesta sessão (o toggle global fica intacto)
const NOTE = '<p class="lead">Resumo próprio, a partir do consenso da comunidade. <span class="theory">teoria</span> = interpretação de fãs; <span class="vf">verificar</span> = detalhe ainda não conferido.</p>';

const gate = (it, spoilerFree, html) => (it.sp && spoilerFree && !revealed.has(it.id || it.name)
  ? `<div class="gate-sp"><span>🔒 Contém spoilers</span><button class="btn" data-reveal="${esc(it.id || it.name)}">Revelar</button></div>` : html);
const tags = it => `${it.theory ? ' <span class="theory">teoria</span>' : ''}${it.verify ? ' <span class="vf">verificar</span>' : ''}`;
const card = (it, sf) => `<article class="lore panel"><h3>${esc(it.title)}${tags(it)}</h3>${gate(it, sf, `<p>${esc(it.text)}</p>`)}</article>`;

function graph() {
  const by = Object.fromEntries(NODES.map(x => [x.id, x]));
  return `<div class="panel graph"><svg viewBox="0 0 800 420" role="group" aria-label="Árvore de relações">
    ${LINKS.map(([a, b]) => `<line class="ed" data-a="${a}" data-b="${b}" x1="${by[a].x}" y1="${by[a].y}" x2="${by[b].x}" y2="${by[b].y}"/>`).join('')}
    ${NODES.map(x => `<g class="nd ${x.g}" data-id="${x.id}" tabindex="0"><rect x="${x.x - 60}" y="${x.y - 16}" width="120" height="32" rx="3"/><text x="${x.x}" y="${x.y + 4}" text-anchor="middle">${esc(x.name)}</text></g>`).join('')}
  </svg></div><p class="note">Passe o mouse ou foque um nome para realçar as relações.</p>`;
}
function bindGraph(el) {
  const svg = el.querySelector('.graph svg');
  if (!svg) return;
  const on = id => {
    const near = new Set(id ? [id] : []);
    svg.querySelectorAll('.ed').forEach(l => { const h = l.dataset.a === id || l.dataset.b === id; l.classList.toggle('on', h); if (h) { near.add(l.dataset.a); near.add(l.dataset.b); } });
    svg.classList.toggle('focusing', !!id);
    svg.querySelectorAll('.nd').forEach(g => g.classList.toggle('on', near.has(g.dataset.id)));
  };
  const idOf = e => e.target.closest('.nd')?.dataset.id || null;
  svg.addEventListener('pointerover', e => on(idOf(e)));
  svg.addEventListener('pointerleave', () => on(null));
  svg.addEventListener('focusin', e => on(idOf(e)));
  svg.addEventListener('focusout', () => on(null));
}

const body = {
  criacao: sf => `${NOTE}<h3 class="sec">Linha do tempo</h3><ol class="timeline">${TIMELINE.map(t =>
    `<li class="${t.sp && sf && !revealed.has(t.id) ? 'locked' : ''}"><b>${esc(t.title)}</b> ${gate(t, sf, `<span>${esc(t.text)}</span>`)}</li>`).join('')}</ol>
    <h3 class="sec">A criação e os Lordes</h3><div class="grid2">${ORIGENS.map(i => card(i, sf)).join('')}</div>`,
  reinos: sf => `${NOTE}<div class="grid2">${REINOS.map(r => `<article class="lore panel"><h3>${esc(r.name)}</h3>${gate({ ...r, id: r.id }, sf,
    `<p>${esc(r.blurb)}</p>${r.figs.length ? `<p><b>Figuras:</b> ${r.figs.map(esc).join(', ')}</p>` : ''}${r.gear.length ? `<p><b>Equipamentos:</b> ${r.gear.map(esc).join(', ')}</p>` : ''}`)}</article>`).join('')}</div>`,
  tragedias: sf => `${NOTE}<div class="grid2">${TRAGEDIAS.map(i => card(i, sf)).join('')}</div><h3 class="sec">Árvore de relações</h3>${graph()}`,
  finais: sf => `${NOTE}${gate({ sp: true, id: 'l-serpentes', name: 'serpentes' }, sf,
    `<div class="tablewrap panel"><table class="matrix"><thead><tr><th>Aspecto</th><th>Kingseeker Frampt</th><th>Darkstalker Kaathe</th></tr></thead><tbody>${SERPENTES.map(r => `<tr><th scope="row">${esc(r[0])}</th><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join('')}</tbody></table></div>`)}`,
};

export function renderLore(el, store) {
  let tab = store.get().settings.loreTab;
  if (!TABS[tab]) tab = 'criacao';
  const sf = store.get().settings.spoilerFree;
  el.innerHTML = `<h2>Lore e Enciclopédia de Lordran</h2>
    ${sf ? '<p class="banner">Modo Sem Spoilers ativo: trechos de trama ficam trancados. Revele um a um, ou desative o modo no cabeçalho.</p>' : ''}
    <div class="tabs" role="tablist">${Object.entries(TABS).map(([k, l]) => `<button role="tab" class="tab" data-tab="${k}" aria-selected="${k === tab}">${l}</button>`).join('')}</div>
    <div id="lbody">${body[tab](sf)}</div>`;
  bindGraph(el);
  el.onclick = e => {
    const t = e.target.closest('[data-tab]');
    if (t) { store.setSetting('loreTab', t.dataset.tab); return renderLore(el, store); }
    const r = e.target.closest('[data-reveal]');
    if (r) { revealed.add(r.dataset.reveal); renderLore(el, store); }
  };
}
