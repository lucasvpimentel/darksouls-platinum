// 10 aprimoramentos máximos. Os ids são OS MESMOS dos troféus t-up-*: marcar aqui = marcar na aba Conquistas.
// Fonte: especificação do projeto; não conferido contra o jogo (verify).
export const GROUPS = { andre: 'Andre', rickert: 'Rickert de Vinheim', vamos: 'Vamos', giant: 'Ferreiro Gigante' };

const u = (id, name, group, line, req, o = {}) => ({ id: 't-up-' + id, name, group, tag: group, safe: req, meta: line, verify: true, ...o });

export const UPGRADES = [
  u('strong', 'Strongest Weapon', 'andre', 'Linha padrão +15', 'Large Ember (Depths) + Very Large Ember (New Londo Ruins); Titanite Slab.'),
  u('crystal', 'Crystal Weapon', 'andre', 'Cristal +5', "Crystal Ember (Duke's Archives); Titanite Slab."),
  u('lightning', 'Lightning Weapon', 'giant', 'Raio +5', 'Arma padrão +10 evoluída no Ferreiro Gigante de Anor Londo; Titanite Slab.'),
  u('raw', 'Raw Weapon', 'andre', 'Bruta +5', 'Large Ember (Depths); Titanite Chunks (sem slab).'),
  u('magic', 'Magic Weapon', 'rickert', 'Mágica +10', "Large Magic Ember (Duke's Archives); Blue Titanite Slab."),
  u('enchanted', 'Enchanted Weapon', 'rickert', 'Encantada +5', 'Enchanted Ember (Darkroot Garden); Blue Titanite Slab.'),
  u('divine', 'Divine Weapon', 'andre', 'Divina +10', 'Divine Ember (Darkroot) + Large Divine Ember (Tomb of the Giants); White Titanite Slab.'),
  u('occult', 'Occult Weapon', 'andre', 'Oculta +5', 'Dark Ember (Painted World of Ariamis); White Titanite Slab.'),
  u('fire', 'Fire Weapon', 'vamos', 'Fogo +10', 'Large Flame Ember (Demon Ruins); Red Titanite Slab.'),
  u('chaos', 'Chaos Weapon', 'vamos', 'Caos +5', 'Chaos Flame Ember (Demon Ruins); Red Titanite Slab.'),
];
