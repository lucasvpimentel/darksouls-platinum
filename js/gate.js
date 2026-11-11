import { check, startSession } from './auth.js';

const $ = s => document.querySelector(s);

export function initGate(onOk) {
  const gate = $('#gate'), card = $('#gate-form'), pin = $('#pin'), user = $('#user'), msg = $('#gate-msg');
  const slots = [...document.querySelectorAll('.slot')];

  const paint = () => slots.forEach((s, i) => {
    s.classList.toggle('on', i < pin.value.length);
    s.classList.toggle('cur', i === pin.value.length);
  });
  const setPin = v => { pin.value = v.replace(/\D/g, '').slice(0, 4); paint(); };

  pin.addEventListener('input', () => setPin(pin.value));
  pin.addEventListener('focus', paint);
  pin.addEventListener('blur', paint);

  document.querySelector('.keypad').addEventListener('click', e => {
    const k = e.target.closest('button')?.dataset.k;
    if (k == null) return;
    if (k === 'del') setPin(pin.value.slice(0, -1));
    else if (k === 'ok') card.requestSubmit();
    else setPin(pin.value + k);
  });

  card.addEventListener('animationend', () => card.classList.remove('shake'));

  card.addEventListener('submit', async e => {
    e.preventDefault();
    msg.textContent = '';
    let ok = false;
    try {
      ok = pin.value.length === 4 && await check(user.value, pin.value);
    } catch {
      msg.textContent = 'Requer HTTPS ou localhost (Web Crypto indisponível).';
      return;
    }
    if (!ok) {
      msg.textContent = 'Humanidade Negada — Acesso Recusado';
      setPin('');
      card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
      return;
    }
    startSession($('#remember').checked);
    gate.classList.add('unlocking');
    setTimeout(() => { gate.hidden = true; gate.classList.remove('unlocking'); onOk(); }, 900);
  });

  paint();
}

export function showGate() {
  const gate = $('#gate');
  $('#pin').value = ''; $('#gate-msg').textContent = '';
  gate.hidden = false;
  document.querySelectorAll('.slot').forEach(s => s.classList.remove('on'));
  $('#user').focus();
}
