import { progress } from '../store.js';
import { TROPHIES, GROUPS, TROPHY_IDS } from '../data/trophies.js';
import { ROUTE, ROUTE_IDS } from '../data/route.js';
import { WEAPON_IDS } from '../data/weapons.js';
import { ALL_SPELLS } from '../data/spells.js';
import { loadCfg } from '../sync.js';
import { openMap } from './atlas.js';
import { esc } from '../util.js';

const LINKS = [
  ['#/rota', '🧭', 'Rota de Mapas', 'Áreas em ordem, com chefes e pontos sem retorno'],
  ['#/atlas', '🗺️', 'Atlas', 'Diagrama, mapas e conexões'],
  ['#/conquistas', '🏆', 'Conquistas', 'Os 41 troféus'],
  ['#/armas', '⚔️', 'Armas Raras', "Knight's Honor"],
  ['#/magias', '✨', 'Magias', 'Feitiços, piromancias e milagres'],
  ['#/aprimoramentos', '🔨', 'Aprimoramentos', 'Brasas, ferreiros e titanitas'],
  ['#/farm', '💰', 'Farm', 'Itens, titanitas e almas'],
  ['#/lore', '📜', 'Lore', 'A história de Lordran'],
  ['#/builds', '🛡️', 'Builds', 'Meta, memebuilds e simulador'],
  ['#/dados', '☁️', 'Dados & Nuvem', 'Backup e sincronização'],
];

const bar = (done, total) => `<div class="bar mini"><i style="width:${total ? (done / total) * 100 : 0}%"></i></div>`;

export function renderHome(el, store) {
  const { checks, settings } = store.get();
  const sf = settings.spoilerFree;
  const text = it => (sf || !it.full ? it.safe : it.full);

  const plat = progress(checks, TROPHY_IDS);
  const groups = Object.entries(GROUPS).filter(([k]) => k !== 'platina').map(([k, label]) => {
    const ids = TROPHIES.filter(t => t.group === k && !t.auto).map(t => t.id);
    return [label, progress(checks, ids)];
  });
  const others = [
    ['Rota de mapas', progress(checks, ROUTE_IDS)],
    ['Armas raras', progress(checks, WEAPON_IDS)],
    ['Magias', progress(checks, ALL_SPELLS.map(x => x.id))],
  ];

  // próximo item pendente da rota e alertas pendentes (⚠)
  const pending = ROUTE.flatMap(a => a.items.filter(i => !checks[i.id]).map(i => ({ ...i, area: a })));
  const next = pending[0];
  const warns = pending.filter(i => i.warn).slice(0, 3);
  const last = loadCfg().lastSync;

  el.innerHTML = `
    <section class="hero panel">
      <p class="eyebrow">Bem-vindo de volta, Escolhido</p>
      <h2>${plat.pct === 100 ? 'A Platina é sua.' : 'A jornada continua.'}</h2>
      <div class="bigprog"><div class="bar"><i style="width:${plat.pct}%"></i></div><b>${plat.pct}%</b></div>
      <p class="note">${plat.done}/${plat.total} troféus conquistados${plat.pct === 100 ? ' — The Dark Soul desbloqueada.' : ' para a Platina.'}</p>
    </section>

    <div class="grid2 homegrid">
      <section class="panel lore">
        <h3>Próximo passo</h3>
        ${next ? `<p><b>${esc(next.area.area)}</b></p><p>${esc(text(next))}</p>
          <div class="btnrow"><a class="btn primary" href="#/rota">Abrir a rota</a><button class="btn" data-map="${next.area.id}">🗺️ Abrir mapa</button></div>`
          : '<p>Rota completa. Falta só o que estiver pendente nas outras abas.</p>'}
        ${warns.length ? `<h4 class="sec">⚠ Atenção</h4><ul class="plain">${warns.map(w => `<li>${esc(w.area.area)}: ${esc(text(w))}</li>`).join('')}</ul>` : ''}
      </section>

      <section class="panel lore">
        <h3>Troféus por categoria</h3>
        <ul class="stats">${groups.map(([l, p]) => `<li><span>${esc(l)}</span><span>${p.done}/${p.total}</span>${bar(p.done, p.total)}</li>`).join('')}</ul>
      </section>

      <section class="panel lore">
        <h3>Outros rastreadores</h3>
        <ul class="stats">${others.map(([l, p]) => `<li><span>${esc(l)}</span><span>${p.done}/${p.total}</span>${bar(p.done, p.total)}</li>`).join('')}</ul>
        <p class="note">${last ? `Último sync na nuvem: ${new Date(last).toLocaleString('pt-BR')}` : 'Nuvem ainda não configurada (Dados &amp; Nuvem).'}</p>
      </section>
    </div>

    <h3 class="sec">Seções</h3>
    <div class="homelinks">${LINKS.map(([h, i, t, d]) => `<a class="panel hl" href="${h}"><span class="hi" aria-hidden="true">${i}</span><b>${esc(t)}</b><small>${esc(d)}</small></a>`).join('')}</div>`;

  el.onclick = e => {
    const b = e.target.closest('[data-map]');
    if (b) openMap(b.dataset.map, store);
  };
}
