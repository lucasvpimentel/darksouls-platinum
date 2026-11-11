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
