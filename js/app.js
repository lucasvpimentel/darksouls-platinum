import { hasSession, endSession } from './auth.js';
import { initGate, showGate } from './gate.js';
import { createStore, progress } from './store.js';
import { startRouter } from './router.js';
import { TROPHY_IDS } from './data/trophies.js';
import { renderRoute } from './views/route.js';
import { renderTrophies } from './views/trophies.js';
import { renderWeapons } from './views/weapons.js';
import { renderAtlas } from './views/atlas.js';
import { renderData } from './views/data.js';
import { renderBuilds } from './views/builds.js';
import { renderFarm } from './views/farm.js';
import { renderMagic, renderUpgrades } from './views/magic.js';

const $ = s => document.querySelector(s);
const VIEWS = { rota: renderRoute, conquistas: renderTrophies, armas: renderWeapons, atlas: renderAtlas, builds: renderBuilds, dados: renderData, farm: renderFarm, magias: renderMagic, aprimoramentos: renderUpgrades };

// localStorage pode lançar (modo privado, dados bloqueados): o store lida com isso e avisa.
const storage = (() => { try { return window.localStorage; } catch { return { getItem() { throw 1; }, setItem() { throw 1; } }; } })();

let store, current = 'rota', go, started = false;
const hhmm = t => new Date(t).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

function paintHeader() {
  const d = store.get();
  const p = progress(d.checks, TROPHY_IDS); // % da Platina = 40 troféus marcáveis
  $('#bar').style.width = p.pct + '%';
  $('#pct').textContent = p.pct + '%';
  $('.bar').setAttribute('aria-valuenow', p.pct);
  const on = d.settings.spoilerFree;
  $('#spoil').setAttribute('aria-checked', on);
  $('#spoil b').textContent = on ? 'ATIVO' : 'INATIVO';
}

function renderView(route) {
  current = route;
  document.querySelectorAll('#nav a').forEach(a => {
    if (a.hash === '#/' + route) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  const el = $('#view');
  el.onchange = null; el.onclick = null;
  if (VIEWS[route]) return VIEWS[route](el, store);
}

function start() {
  $('#app').hidden = false;
  if (started) { paintHeader(); go(); return; }
  started = true;
  store = createStore(storage);
  store.subscribe(paintHeader);
  store.onStatus((s, t) => {
    const el = $('#save');
    el.classList.toggle('ok', s === 'saved');
    el.textContent = s === 'saving' ? 'Gravando na fogueira…' : s === 'saved' ? `Progresso salvo na fogueira · ${hhmm(t)}` : '';
    const b = $('#banner');
    b.hidden = s !== 'error';
    if (s === 'error') b.textContent = 'Não foi possível salvar neste navegador. O progresso vale só até fechar a página — use Exportar (Dados & Nuvem).';
  });

  $('#spoil').addEventListener('click', () => {
    store.setSetting('spoilerFree', !store.get().settings.spoilerFree);
    renderView(current);
  });
  $('#logout').addEventListener('click', () => {
    store.flush(); endSession(); $('#app').hidden = true; showGate();
  });
  addEventListener('pagehide', () => store.flush());
  document.addEventListener('visibilitychange', () => document.hidden && store.flush());

  paintHeader();
  go = startRouter(renderView);
}

initGate(start);
if (hasSession()) { $('#gate').hidden = true; start(); }
