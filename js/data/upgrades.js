// 10 aprimoramentos máximos. Os ids são OS MESMOS dos troféus t-up-*: marcar aqui = marcar na aba Conquistas.
// Fonte: guia de conquistas da Fextralife (requisitos de caminho, ferreiro e materiais conferidos).
// Locais das brasas são do briefing do projeto (verify onde indicado).
export const GROUPS = { andre: 'Andre', rickert: 'Rickert de Vinheim', vamos: 'Vamos', giant: 'Ferreiro Gigante' };

const u = (id, name, group, line, req, o = {}) => ({ id: 't-up-' + id, name, group, tag: group, safe: req, meta: line, ...o });

export const UPGRADES = [
  u('strong', 'Strongest Weapon', 'andre', 'Padrão +15',
    'Andre, com Large Ember e Very Large Ember; usa Titanite Shards, Large Shards, Chunks e Slab. Large Ember nas Depths e Very Large Ember em New Londo Ruins.', { verify: true }),
  u('crystal', 'Crystal Weapon', 'giant', 'Cristal +5',
    "Ferreiro Gigante (Anor Londo): arma +10 padrão antes; Crystal Ember (Duke's Archives); usa Titanite Chunks e Slab.", { verify: true }),
  u('lightning', 'Lightning Weapon', 'giant', 'Raio +5',
    'Ferreiro Gigante (Anor Londo): arma +10 padrão antes; usa Titanite Chunks e Slab.'),
  u('raw', 'Raw Weapon', 'andre', 'Bruta +5',
    'Andre: arma +5 padrão antes; Large Ember; usa Large Titanite Shards (sem Slab).', { verify: true }),
  u('magic', 'Magic Weapon', 'rickert', 'Mágica +10',
    "Rickert de Vinheim (New Londo Ruins): arma +5 padrão antes; Large Magic Ember (Duke's Archives); usa Green Shards, Blue Chunks e Blue Slab.", { verify: true }),
  u('enchanted', 'Enchanted Weapon', 'rickert', 'Encantada +5',
    'Rickert: parte de uma arma Mágica +5; Enchanted Ember (Darkroot Garden); usa Blue Chunks e Blue Slab.', { verify: true }),
  u('divine', 'Divine Weapon', 'andre', 'Divina +10',
    'Andre: arma +5 padrão antes; Divine Ember (Darkroot) e Large Divine Ember (Tomb of the Giants) para +10; usa Green Shards, White Chunks e White Slab.', { verify: true }),
  u('occult', 'Occult Weapon', 'andre', 'Oculta +5',
    'Andre: parte de uma arma Divina +5; Dark Ember (Painted World of Ariamis); usa White Chunks e White Slab.', { verify: true }),
  u('fire', 'Fire Weapon', 'vamos', 'Fogo +10',
    'Vamos (Catacombs): arma +5 padrão antes; Large Flame Ember (Demon Ruins); usa Green Shards, Red Chunks e Red Slab.', { verify: true }),
  u('chaos', 'Chaos Weapon', 'vamos', 'Caos +5',
    'Vamos: parte de uma arma Fogo +5; Chaos Flame Ember (Demon Ruins); usa Red Chunks e Red Slab.', { verify: true }),
];
