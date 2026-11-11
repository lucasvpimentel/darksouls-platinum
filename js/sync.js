// Sincronização via GitHub Gist privado. O token fica só neste navegador (chave própria) e NUNCA entra no save/export.
import { migrate } from './store.js';

export const CFG_KEY = 'dsr_cloud';
export const FILE = 'dsr_platinum_v1.json';
const API = 'https://api.github.com';

export function loadCfg() {
  try { return JSON.parse(localStorage.getItem(CFG_KEY)) || {}; } catch { return {}; }
}
export function saveCfg(c) {
  try { localStorage.setItem(CFG_KEY, JSON.stringify(c)); } catch { /* sem armazenamento */ }
}

async function gh(path, token, opts = {}, f = fetch) {
  const r = await f(API + path, {
    ...opts,
    headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
  if (!r.ok) {
    const hint = r.status === 401 ? 'token inválido ou expirado' : r.status === 404 ? 'Gist não encontrado (ou token sem permissão de Gist)' : `HTTP ${r.status}`;
    throw new Error(hint);
  }
  return r.json();
}

// Procura um Gist nosso (evita criar duplicado ao configurar um 2º aparelho).
export async function findGist(token, f = fetch) {
  const list = await gh('/gists?per_page=100', token, {}, f);
  return list.find(g => g.files && g.files[FILE])?.id || null;
}

export async function readRemote(token, id, f = fetch) {
  const g = await gh(`/gists/${id}`, token, {}, f);
  const file = g.files[FILE];
  if (!file) throw new Error('o Gist não contém ' + FILE);
  let text = file.content;
  if (file.truncated) text = await (await f(file.raw_url)).text();
  return migrate(JSON.parse(text)); // valida schema
}

export async function pushRemote(token, id, data, f = fetch) {
  const files = { [FILE]: { content: JSON.stringify(data, null, 1) } };
  if (id) { await gh(`/gists/${id}`, token, { method: 'PATCH', body: JSON.stringify({ files }) }, f); return id; }
  const g = await gh('/gists', token, { method: 'POST', body: JSON.stringify({ description: 'Dark Souls Remastered — progresso de platina', public: false, files }) }, f);
  return g.id;
}
