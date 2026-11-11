// Estado único, versionado, com auto-save debounced.
export const KEY = 'dsr_platinum_v1';
export const SCHEMA = 1;

export const blank = () => ({ schemaVersion: SCHEMA, updatedAt: 0, settings: { spoilerFree: true }, checks: {} });

// Ao subir SCHEMA, adicione migrations[N] = d => ({ ...d, schemaVersion: N + 1, ... }) para vN -> vN+1.
const migrations = {};

export function migrate(d) {
  if (!d || typeof d !== 'object' || Array.isArray(d)) throw new Error('save inválido');
  let v = d.schemaVersion;
  if (!Number.isInteger(v) || v < 1) throw new Error('schemaVersion inválido');
  if (v > SCHEMA) throw new Error('save de versão mais nova');
  while (v < SCHEMA) { d = migrations[v](d); v = d.schemaVersion; }
  const b = blank();
  return {
    ...b, ...d,
    settings: { ...b.settings, ...(d.settings && typeof d.settings === 'object' ? d.settings : {}) },
    checks: d.checks && typeof d.checks === 'object' && !Array.isArray(d.checks) ? d.checks : {},
  };
}

export function progress(checks, ids) {
  const done = ids.filter(i => checks[i]).length;
  return { done, total: ids.length, pct: ids.length ? Math.round((done / ids.length) * 100) : 0 };
}

export function createStore(storage, { delay = 400, now = Date.now } = {}) {
  const subs = new Set(), statusSubs = new Set();
  let timer = null;
  const status = (s, t) => statusSubs.forEach(f => f(s, t));

  const backup = (key, raw) => { try { storage.setItem(key, raw); } catch { /* sem espaço: segue sem backup */ } };

  function load() {
    let raw;
    try { raw = storage.getItem(KEY); } catch { return blank(); }
    if (raw == null) return blank();
    try {
      const parsed = JSON.parse(raw);
      const out = migrate(parsed);
      if (parsed.schemaVersion < SCHEMA) backup(`${KEY}_bak_v${parsed.schemaVersion}`, raw);
      return out;
    } catch {
      backup(`${KEY}_bad_${now()}`, raw); // preserva o original antes do auto-save sobrescrever
      return blank();
    }
  }

  let data = load();

  function persist(keep) {
    clearTimeout(timer); timer = null;
    if (keep !== true) data.updatedAt = now(); // keep: preserva o carimbo (restauração vinda da nuvem/arquivo)
    try { storage.setItem(KEY, JSON.stringify(data)); status('saved', data.updatedAt); }
    catch { status('error'); }
  }
  function touch() {
    status('saving');
    clearTimeout(timer);
    timer = setTimeout(() => persist(), delay);
    subs.forEach(f => f(data));
  }

  return {
    get: () => data,
    isChecked: id => !!data.checks[id],
    set(id, on) { if (on) data.checks[id] = 1; else delete data.checks[id]; touch(); },
    setSetting(k, v) { data.settings[k] = v; touch(); },
    replace(d, { keep = false } = {}) { data = migrate(d); subs.forEach(f => f(data)); keep ? persist(true) : touch(); },
    flush() { if (timer) persist(); },
    subscribe(f) { subs.add(f); return () => subs.delete(f); },
    onStatus(f) { statusSubs.add(f); return () => statusSubs.delete(f); },
  };
}
