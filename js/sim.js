// Simulador de carga e rolamento. Pesos/poise: Fextralife (conferidos). Fórmula: carga máx = (40 + END) × multiplicadores.
// Havel's Ring ×1.5, Ring of Favor and Protection ×1.2, Mask of the Father ×1.05 (multiplicativos).
export const SLOTS = {
  helm: [['', 'Nenhum', 0, 0], ['father', 'Mask of the Father', 1.2, 0], ['giant', 'Giant Helm', 6.3, 0], ['havel', "Havel's Helm", 7.5, 18], ['smough', "Smough's Helm", 6.8, 14], ['bi', 'Black Iron Helm', 6.0, 12]],
  chest: [['', 'Nenhum', 0, 0], ['giant', 'Giant Armor', 16.4, 35], ['havel', "Havel's Armor", 19.5, 47], ['smough', "Smough's Armor", 17.6, 35], ['bi', 'Black Iron Armor', 15.6, 31]],
  gauntlets: [['', 'Nenhum', 0, 0], ['giant', 'Giant Gauntlets', 9.7, 21], ['havel', "Havel's Gauntlets", 11.5, 28], ['smough', "Smough's Gauntlets", 10.4, 21], ['bi', 'Black Iron Gauntlets', 9.2, 18]],
  legs: [['', 'Nenhum', 0, 0], ['giant', 'Giant Leggings', 9.7, 21], ['havel', "Havel's Leggings", 11.5, 28], ['smough', "Smough's Leggings", 10.4, 21], ['bi', 'Black Iron Leggings', 9.2, 18]],
  weapon: [['', 'Nenhuma', 0, 0], ['claymore', 'Claymore', 6, 0], ['zwei', 'Zweihander', 10, 0], ['chaoszwei', 'Chaos Zweihander (peso = Zweihander)', 10, 0], ['club', 'Great Club', 12, 0], ['uchi', 'Uchigatana', 5, 0], ['mgs', 'Moonlight Greatsword', 6, 0], ['scythe', 'Lifehunt Scythe', 6, 0]],
  shield: [['', 'Nenhum', 0, 0], ['grass', 'Grass Crest Shield', 3, 0], ['artorias', 'Greatshield of Artorias', 16, 0], ['bonewheel', 'Bonewheel Shield', 12, 0], ['havelshield', "Havel's Greatshield", 26, 0]],
};
const find = (slot, id) => SLOTS[slot].find(x => x[0] === id) || SLOTS[slot][0];

export const PRESETS = {
  giantdad: { name: 'GiantDad', end: 66, havel: true, fap: true, helm: 'father', chest: 'giant', gauntlets: 'giant', legs: 'giant', weapon: 'chaoszwei', shield: 'grass', extra: 0 },
  quality: { name: 'Quality (padrão)', end: 40, havel: true, fap: false, helm: 'bi', chest: 'bi', gauntlets: 'bi', legs: 'bi', weapon: 'claymore', shield: 'artorias', extra: 0 },
};

export function calc(s) {
  const parts = ['helm', 'chest', 'gauntlets', 'legs', 'weapon', 'shield'].map(k => find(k, s[k]));
  const weight = parts.reduce((a, p) => a + p[2], 0) + (Number(s.extra) || 0);
  const poise = ['helm', 'chest', 'gauntlets', 'legs'].reduce((a, k) => a + find(k, s[k])[3], 0);
  const mult = (s.havel ? 1.5 : 1) * (s.fap ? 1.2 : 1) * (s.helm === 'father' ? 1.05 : 1);
  const max = (40 + s.end) * mult;
  const pct = max ? (weight / max) * 100 : 0;
  const cat = pct > 100 ? 'over' : pct > 50 ? 'fat' : pct > 25 ? 'mid' : 'fast';
  // END mínima (≤ 99) para cada categoria, ou null se inalcançável
  const need = limit => { const n = Math.ceil(weight / (limit / 100) / mult - 40); return n <= 99 ? Math.max(1, n) : null; };
  return { weight, poise, max, pct, cat, needFast: need(25), needMid: need(50) };
}
