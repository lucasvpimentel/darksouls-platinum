// Portão de usuário único. ATENÇÃO: é UX, não segurança — hash e salt ficam num arquivo público.
// ponytail: PIN de 4 dígitos = 10^4 combinações, força-bruta trivial; aceitável para um gate cosmético.
const SALT = 'dsr-lordvessel-v1';
const HASH = '1da167f7fa9570ac6dd9fca6e88588113dd3a1e4bb4747a2c7c230900fd944a1';
const SESSION_KEY = 'dsr_session';

export async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function check(user, pin) {
  return (await sha256(`${SALT}|${String(user).trim().toLowerCase()}|${pin}`)) === HASH;
}

const safe = fn => { try { return fn(); } catch { return null; } };

export function hasSession() {
  return safe(() => sessionStorage.getItem(SESSION_KEY) === '1' || localStorage.getItem(SESSION_KEY) === '1') === true;
}
export function startSession(remember) {
  safe(() => (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, '1'));
}
export function endSession() {
  safe(() => sessionStorage.removeItem(SESSION_KEY));
  safe(() => localStorage.removeItem(SESSION_KEY));
}
