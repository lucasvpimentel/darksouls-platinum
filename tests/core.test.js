import { test } from 'node:test';
import assert from 'node:assert/strict';
import { check, sha256 } from '../js/auth.js';
import { createStore, migrate, progress, KEY, SCHEMA } from '../js/store.js';
import { ROUTE, ROUTE_IDS } from '../js/data/route.js';

const mem = (init = {}) => {
  const m = new Map(Object.entries(init));
  return { m, getItem: k => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, v) };
};

test('auth: credencial certa/errada', async () => {
  assert.equal(await check('lucasvpimentel', '8253'), true);
  assert.equal(await check('  LucasVPimentel ', '8253'), true);
  assert.equal(await check('lucasvpimentel', '0000'), false);
  assert.equal(await check('outro', '8253'), false);
  assert.equal((await sha256('x')).length, 64);
});

test('store: salva com debounce, flush grava na hora e recarrega', () => {
  const s = mem();
  const st = createStore(s, { delay: 10_000, now: () => 42 });
  st.set('a', true);
  assert.equal(s.m.has(KEY), false);
  st.flush();
  assert.equal(JSON.parse(s.m.get(KEY)).checks.a, 1);
  assert.equal(createStore(s).isChecked('a'), true);
  st.set('a', false); st.flush();
  assert.equal(createStore(s).isChecked('a'), false);
});

test('store: JSON corrompido é preservado em backup e não quebra', () => {
  const s = mem({ [KEY]: '{lixo' });
  const st = createStore(s, { now: () => 7 });
  assert.deepEqual(st.get().checks, {});
  assert.equal(s.m.get(`${KEY}_bad_7`), '{lixo');
});

test('store: versão mais nova não é sobrescrita sem backup', () => {
  const raw = JSON.stringify({ schemaVersion: SCHEMA + 1, checks: { z: 1 } });
  const s = mem({ [KEY]: raw });
  createStore(s, { now: () => 1 });
  assert.equal(s.m.get(`${KEY}_bad_1`), raw);
});

test('store: storage que lança vira status error, sem crash', () => {
  const bad = { getItem() { throw 1; }, setItem() { throw 1; } };
  const st = createStore(bad);
  const seen = [];
  st.onStatus(x => seen.push(x));
  st.set('a', true); st.flush();
  assert.deepEqual(seen, ['saving', 'error']);
});

test('migrate: preenche defaults e rejeita lixo', () => {
  assert.equal(migrate({ schemaVersion: 1 }).settings.spoilerFree, true);
  assert.throws(() => migrate(null));
  assert.throws(() => migrate({}));
});

test('progress: percentual', () => {
  assert.deepEqual(progress({ a: 1 }, ['a', 'b', 'c', 'd']), { done: 1, total: 4, pct: 25 });
  assert.equal(progress({}, []).pct, 0);
});

test('rota: ids únicos, safe obrigatório, tipos válidos', () => {
  assert.equal(new Set(ROUTE_IDS).size, ROUTE_IDS.length);
  const types = new Set(['boss', 'tail', 'key', 'covenant', 'npc', 'item']);
  for (const a of ROUTE) for (const it of a.items) {
    assert.ok(it.safe, it.id);
    assert.ok(types.has(it.type), it.id);
  }
});

import { TROPHIES, TROPHY_IDS, GROUPS } from '../js/data/trophies.js';
test('troféus: 41 no total, contagem por categoria, ids únicos', () => {
  assert.equal(TROPHIES.length, 41);
  assert.equal(TROPHY_IDS.length, 40);
  assert.equal(new Set(TROPHIES.map(t => t.id)).size, 41);
  const by = g => TROPHIES.filter(t => t.group === g).length;
  const want = { platina: 1, historia: 9, chefes: 6, finais: 2, pactos: 9, colecao: 4, aprimoramento: 10 };
  for (const g of Object.keys(GROUPS)) assert.equal(by(g), want[g], g);
});

import { WEAPONS, SIF_IDS } from '../js/data/weapons.js';
test('armas: 49 conferidas, split por grupo, ids únicos, Sif existe', () => {
  assert.equal(WEAPONS.length, 49);
  assert.equal(new Set(WEAPONS.map(w => w.id)).size, 49);
  const by = g => WEAPONS.filter(w => w.group === g).length;
  assert.deepEqual([by('boss'), by('cauda'), by('pacto'), by('tesouro'), by('drop')], [15, 6, 2, 9, 17]);
  for (const id of SIF_IDS) assert.ok(WEAPONS.some(w => w.id === id), id);
});

import { FARM } from '../js/data/farm.js';
test('farm: ids únicos, todo item marcado verify', () => {
  assert.equal(new Set(FARM.map(f => f.id)).size, FARM.length);
  assert.ok(FARM.every(f => f.verify && f.safe));
});

import { SORCERIES, PYROMANCIES, MIRACLES } from '../js/data/spells.js';
import { UPGRADES } from '../js/data/upgrades.js';
test('magias 24/19/23, ids únicos; aprimoramentos 10 ligados aos troféus', () => {
  assert.deepEqual([SORCERIES.length, PYROMANCIES.length, MIRACLES.length], [24, 19, 23]);
  const all = [...SORCERIES, ...PYROMANCIES, ...MIRACLES];
  assert.equal(new Set(all.map(x => x.id)).size, 66);
  assert.equal(UPGRADES.length, 10);
  for (const u of UPGRADES) assert.ok(TROPHIES.some(t => t.id === u.id), u.id);
});

import { AREAS, EDGES, ROUTE_FOR, byId } from '../js/data/atlas.js';
test('atlas: ids únicos, arestas válidas, áreas da rota existem no atlas', () => {
  assert.equal(new Set(AREAS.map(a => a.id)).size, AREAS.length);
  for (const x of EDGES) assert.ok(byId[x.a] && byId[x.b], `${x.a}-${x.b}`);
  for (const r of ROUTE) assert.ok(byId[r.id], r.id);
  for (const v of Object.values(ROUTE_FOR)) assert.ok(ROUTE.some(r => r.id === v), v);
  const linked = new Set(EDGES.flatMap(x => [x.a, x.b]));
  for (const a of AREAS) assert.ok(linked.has(a.id), 'isolado: ' + a.id);
});

import { findGist, readRemote, pushRemote, FILE } from '../js/sync.js';
test('sync: cria Gist, atualiza, lê e valida schema (fetch simulado)', async () => {
  const calls = [];
  const saved = { schemaVersion: 1, updatedAt: 5, settings: {}, checks: { a: 1 } };
  const f = async (url, o = {}) => {
    calls.push([o.method || 'GET', url.replace('https://api.github.com', '')]);
    const ok = body => ({ ok: true, status: 200, json: async () => body });
    if (url.endsWith('/gists?per_page=100')) return ok([{ id: 'x1', files: { [FILE]: {} } }]);
    if (o.method === 'POST') return ok({ id: 'new1' });
    if (o.method === 'PATCH') return ok({});
    return ok({ files: { [FILE]: { content: JSON.stringify(saved) } } });
  };
  assert.equal(await findGist('t', f), 'x1');
  assert.equal(await pushRemote('t', '', saved, f), 'new1');
  assert.equal(await pushRemote('t', 'x1', saved, f), 'x1');
  assert.equal((await readRemote('t', 'x1', f)).checks.a, 1);
  assert.deepEqual(calls.map(c => c[0]), ['GET', 'POST', 'PATCH', 'GET']);
  const bad = async () => ({ ok: false, status: 401 });
  await assert.rejects(() => findGist('t', bad), /token inválido/);
});

test('store.replace keep preserva updatedAt; sem keep agenda save', () => {
  const s = mem();
  const st = createStore(s, { delay: 10_000, now: () => 999 });
  st.replace({ schemaVersion: 1, updatedAt: 5, checks: { z: 1 } }, { keep: true });
  assert.equal(JSON.parse(s.m.get(KEY)).updatedAt, 5);
});

import { calc, PRESETS } from '../js/sim.js';
test('simulador: GiantDad fica em Fast Roll com 77 de poise; thresholds e overburden', () => {
  const g = calc(PRESETS.giantdad);
  assert.equal(g.poise, 77);
  assert.equal(g.cat, 'fast');
  assert.ok(Math.abs(g.max - 106 * 1.5 * 1.2 * 1.05) < 1e-9);
  assert.equal(calc({ ...PRESETS.giantdad, havel: false, fap: false, helm: '', end: 1 }).cat, 'over');
  const q = calc({ ...PRESETS.quality, end: 40, havel: false });
  assert.equal(q.cat, calc({ ...PRESETS.quality, end: 40, havel: false }).cat);
  assert.ok(calc({ ...PRESETS.giantdad, end: g.needFast }).pct <= 25);
  assert.ok(calc({ ...PRESETS.giantdad, end: g.needFast - 1 }).pct > 25 || g.needFast === 1);
});

import { TIMELINE, ORIGENS, REINOS, TRAGEDIAS, NODES, LINKS, SERPENTES } from '../js/data/lore.js';
test('lore: ids únicos, grafo consistente, tabela das serpentes completa', () => {
  const ids = [...TIMELINE, ...ORIGENS, ...REINOS, ...TRAGEDIAS].map(x => x.id);
  assert.equal(new Set(ids).size, ids.length);
  const n = new Set(NODES.map(x => x.id));
  for (const [a, b] of LINKS) assert.ok(n.has(a) && n.has(b), `${a}-${b}`);
  assert.equal(REINOS.length, 7);
  assert.ok(SERPENTES.every(r => r.length === 3));
});

import { MAP_IMAGES } from '../js/data/atlas.js';
test('mapas: cada imagem aponta para uma área válida e para a CDN da Steam', () => {
  for (const [id, urls] of Object.entries(MAP_IMAGES)) {
    assert.ok(id === 'world' || byId[id], id);
    for (const u of urls) assert.match(u, /^https:\/\/images\.steamusercontent\.com\/ugc\/\d+\/[0-9A-F]{40}\/$/);
  }
  assert.equal(Object.keys(MAP_IMAGES).length, 21);
});

import { ROUTES } from '../js/router.js';
test('router: home é a primeira rota', () => assert.equal(ROUTES[0], 'home'));

import { execFileSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const jsFiles = d => readdirSync(d).flatMap(f => (statSync(join(d, f)).isDirectory() ? jsFiles(join(d, f)) : f.endsWith('.js') ? [join(d, f)] : []));
test('todos os módulos JS têm sintaxe válida (app.js quebrado = login morto)', () => {
  const files = jsFiles('js');
  assert.ok(files.length > 20);
  for (const f of files) execFileSync(process.execPath, ['--check', f], { stdio: 'pipe' });
});

import { QUESTS, QUEST_STEP_IDS, stepId } from '../js/data/quests.js';
test('questlines: ids únicos, todo passo tem texto, passos com full têm sp', () => {
  assert.equal(new Set(QUEST_STEP_IDS).size, QUEST_STEP_IDS.length);
  assert.ok(QUESTS.length >= 10);
  for (const q of QUESTS) for (const x of q.steps) {
    assert.ok(x.safe, stepId(q, x));
    if (x.full) assert.ok(x.sp, 'full sem sp: ' + stepId(q, x));
  }
});
