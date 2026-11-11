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
  ['#/quests', '🧑‍🤝‍🧑', 'Questlines', 'Passo a passo dos NPCs e o que pode travar'],
  ['#/lore', '📜', 'Lore', 'A história de Lordran'],
  ['#/builds', '🛡️', 'Builds', 'Meta, memebuilds e simulador'],
  ['#/dados', '☁️', 'Dados & Nuvem', 'Backup e sincronização'],
];

const TIPS = [
  'Corte a cauda do chefe antes de matá-lo: depois não dá mais para voltar atrás.',
  'Sif tem uma alma por ciclo e três armas dependem dela: a Platina exige chegar ao NG++.',
  'Compre todos os feitiços de Griggs e Dusk antes de eles partirem: não há segunda chance.',
  'Quelana deixa de vender quando é morta. Compre tudo antes de matar o chefe do caos.',
  'O Darkwraith exige não depositar o Lordvessel antes de vencer os Four Kings.',
  "Todas as armas do Knight's Honor precisam estar no mesmo personagem.",
  'Faça o pacto Gravelord Servant antes de enfrentar Nito.',
  'Use Homeward Bone para reiniciar o ciclo de farm em cada fogueira.',
];
const tip = TIPS[Math.floor(Date.now() / 864e5) % TIPS.length];
const EMBERS = Array.from({ length: 9 }, (_, i) => `<i style="--x:${8 + i * 10}%;--d:${(i * 0.7) % 4}s;--s:${3.2 + (i % 3)}s"></i>`).join('');
const FIRE = `<svg viewBox="0 0 64 64" class="fire" aria-hidden="true"><path d="M32 6c4 9 12 14 12 25 0 7-5 12-12 12s-12-5-12-12c0-5 2-8 5-10 0 5 2 7 5 7-1-8 0-14 2-22z" fill="#c59b47"/><path d="M32 22c3 5 6 7 6 13 0 4-3 6-6 6s-6-2-6-6c0-4 3-6 6-13z" fill="#dfb76c"/><path d="M32 36v24M25 56h14" stroke="#ede6d4" stroke-width="3.5" stroke-linecap="round"/></svg>`;
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
      <div class="embers" aria-hidden="true">${EMBERS}</div>
      <div class="herofire">${FIRE}</div>
      <div class="herotext">
        <p class="eyebrow">Bem-vindo de volta, Escolhido</p>
        <h2>${plat.pct === 100 ? 'A Platina é sua.' : plat.done === 0 ? 'A fogueira espera por você.' : 'A jornada continua.'}</h2>
        <p class="note">${plat.done}/${plat.total} troféus conquistados${plat.pct === 100 ? ' — The Dark Soul desbloqueada.' : ' para a Platina.'}</p>
        ${plat.done === 0 ? '<p class="starthint">Nada marcado ainda. Comece pela <a href="#/rota">Rota de Mapas</a> e vá marcando conforme avança: tudo é salvo sozinho.</p>' : ''}
      </div>
      <div class="ring" style="--p:${plat.pct}" role="img" aria-label="${plat.pct}% da Platina"><b>${plat.pct}%</b><small>Platina</small></div>
    </section>

    <div class="statrow">
      ${[['Troféus', plat.done, plat.total], ['Rota', others[0][1].done, others[0][1].total], ['Armas raras', others[1][1].done, others[1][1].total], ['Magias', others[2][1].done, others[2][1].total]]
        .map(([l, d, t]) => `<div class="panel stat"><b>${d}<small>/${t}</small></b><span>${l}</span></div>`).join('')}
    </div>

    <p class="tip panel"><span aria-hidden="true">🔥</span> <b>Dica do dia:</b> ${esc(tip)}</p>

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

    <h3 class="sec orn"><span>Seções</span></h3>
    <div class="homelinks">${LINKS.map(([h, i, t, d]) => `<a class="panel hl" href="${h}"><span class="hi" aria-hidden="true">${i}</span><b>${esc(t)}</b><small>${esc(d)}</small></a>`).join('')}</div>`;

  el.onclick = e => {
    const b = e.target.closest('[data-map]');
    if (b) openMap(b.dataset.map, store);
  };
}
