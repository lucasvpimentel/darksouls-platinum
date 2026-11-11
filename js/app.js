import { hasSession, endSession } from './auth.js';
import { initGate, showGate } from './gate.js';
import { createStore, progress } from './store.js';
import { startRouter } from './router.js';
import { ROUTE_IDS } from './data/route.js';
import { renderRoute } from './views/route.js';

const $ = s => document.querySelector(s);
const SOON = {
  conquistas: ['Conquistas', 2], armas: ['Armas Raras', 3], magias: ['Magias', 4],
  aprimoramentos: ['Aprimoramentos', 4], builds: ['Builds', 5], dados: ['Dados & Nuvem', 5],
};

// localStorage pode lançar (modo privado, dados bloqueados): o store lida com isso e avisa.
const storage = (() => { try { return window.localStorage; } catch { return { getItem() { throw 1; }, setItem() { throw 1; } }; } })();

let store, current = 'rota', go, started = false;
const hhmm = t => new Date(t).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

function paintHeader() {
  const d = store.get();
  const p = progress(d.checks, ROUTE_IDS); // Fase 2 troca para os 41 troféus
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
  el.onchange = null;
  if (route === 'rota') return renderRoute(el, store);
  const [name, phase] = SOON[route];
  el.innerHTML = `<div class="panel soon"><h2>${name}</h2><p class="lead">Chega na Fase ${phase}.</p></div>`;
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
