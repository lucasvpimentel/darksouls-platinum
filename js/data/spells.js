// 24 feitiços, 19 piromancias, 23 milagres. Fonte: guias de conquistas da Fextralife (conferidos).
// warn = alerta de perda definitiva / ordem. IDs estáveis (chaves do save).
export const TABS = { sorc: 'Feitiços (24)', pyro: 'Piromancias (19)', miracle: 'Milagres (23)' };

const s = (tag, id, name, group, safe, o = {}) => ({ id: `m-${id}`, name, group, tag, safe, ...o });
const so = (...a) => s('sorc', ...a), py = (...a) => s('pyro', ...a), mi = (...a) => s('miracle', ...a);

export const SORC_GROUPS = { griggs: 'Griggs', logan: 'Big Hat Logan', dusk: 'Dusk of Oolacile', ingward: 'Ingward', mundo: 'Achados no mundo' };
export const PYRO_GROUPS = { laurentius: 'Laurentius', eingyi: 'Eingyi', chaos: 'Chaos Servant', quelana: 'Quelana', mundo: 'Achados no mundo' };
export const MIRACLE_GROUPS = { petrus: 'Petrus / Reah / Patches', oswald: 'Oswald', siegmeyer: 'Siegmeyer', pacto: 'Pactos', mundo: 'Achados no mundo' };

export const SORCERIES = [
  so('soul-arrow', 'Soul Arrow', 'griggs', 'Compre de Griggs ou Big Hat Logan.'),
  so('great-soul-arrow', 'Great Soul Arrow', 'griggs', 'Compre de Griggs ou Big Hat Logan.'),
  so('heavy-soul-arrow', 'Heavy Soul Arrow', 'griggs', 'Compre de Griggs ou Big Hat Logan.'),
  so('great-heavy-soul-arrow', 'Great Heavy Soul Arrow', 'griggs', 'Compre de Griggs ou Big Hat Logan.'),
  so('aural-decoy', 'Aural Decoy', 'griggs', 'Compre só de Griggs.', { warn: true, meta: 'Perda: Griggs vai embora depois que você compra tudo.' }),
  so('fall-control', 'Fall Control', 'griggs', 'Compre só de Griggs.', { warn: true, meta: 'Perda: Griggs vai embora depois que você compra tudo.' }),
  so('hush', 'Hush', 'griggs', "Drop de Griggs (oco em Sen's Fortress) ou item achado lá. Só mate-o depois de comprar todo o estoque.", { warn: true }),

  so('homing-soulmass', 'Homing Soulmass', 'logan', 'Compre de Big Hat Logan.'),
  so('homing-crystal', 'Homing Crystal Soulmass', 'logan', "Compre de Logan depois que ele se muda para Duke's Archives."),
  so('soul-spear', 'Soul Spear', 'logan', 'Compre de Big Hat Logan.'),
  so('crystal-soul-spear', 'Crystal Soul Spear', 'logan', "Compre de Logan em Duke's Archives."),
  so('magic-weapon', 'Magic Weapon', 'logan', 'Compre de Logan ou Griggs.'),
  so('crystal-magic-weapon', 'Crystal Magic Weapon', 'logan', "Compre de Logan em Duke's Archives."),
  so('magic-shield', 'Magic Shield', 'logan', 'Compre de Logan ou Griggs.'),
  so('white-dragon-breath', 'White Dragon Breath', 'logan', "Drop de Logan oco, na sala original de Seath em Duke's Archives.", {
    warn: true, meta: 'Antes: compre todo o estoque de Logan, mate Seath em Crystal Cave e volte à sala dele.' }),

  so('hidden-weapon', 'Hidden Weapon', 'dusk', 'Compre de Dusk of Oolacile.', { warn: true, meta: "Perda: o sinal dela some ao pegar o Broken Pendant em Duke's Archives (só volta após o DLC)." }),
  so('hidden-body', 'Hidden Body', 'dusk', 'Compre de Dusk of Oolacile.', { warn: true }),
  so('cast-light', 'Cast Light', 'dusk', 'Compre de Dusk of Oolacile.', { warn: true }),
  so('repair', 'Repair', 'dusk', 'Compre de Dusk of Oolacile.', { warn: true }),
  so('chameleon', 'Chameleon', 'dusk', 'Compre de Dusk of Oolacile.', { warn: true }),

  so('resist-curse', 'Resist Curse', 'ingward', 'Compre de Ingward, o Sealer no topo da Ghosthouse em New Londo Ruins.'),

  so('strong-magic-shield', 'Strong Magic Shield', 'mundo', "Baú em Duke's Archives (fácil de achar na quest de Logan)."),
  so('remedy', 'Remedy', 'mundo', 'Baú nas partes altas de Blighttown, num galho de árvore no caminho de Valley of Drakes.'),
  so('great-magic-weapon', 'Great Magic Weapon', 'mundo', 'Lustre de Anor Londo: corte a corrente nas vigas e mova a escada para alcançá-lo.'),
];

export const PYROMANCIES = [
  py('fireball', 'Fireball', 'laurentius', 'Compre de Laurentius ou Quelana.'),
  py('fire-orb', 'Fire Orb', 'laurentius', 'Compre de Laurentius ou Quelana.'),
  py('combustion', 'Combustion', 'laurentius', 'Compre de Laurentius ou Quelana.'),
  py('iron-flesh', 'Iron Flesh', 'laurentius', 'Compre de Laurentius.'),
  py('flash-sweat', 'Flash Sweat', 'laurentius', 'Compre de Laurentius.'),
  py('poison-mist', 'Poison Mist', 'eingyi', 'Compre de Eingyi (exige um ovo na cabeça) ou ache grátis num cadáver no pântano.'),
  py('toxic-mist', 'Toxic Mist', 'eingyi', 'Compre de Eingyi (exige um ovo na cabeça).'),
  py('great-chaos-fireball', 'Great Chaos Fireball', 'chaos', 'Presente ao entrar no pacto Chaos Servant.'),
  py('chaos-storm', 'Chaos Storm', 'chaos', 'Presente ao chegar ao rank +2 do pacto (30 humanidades).', { warn: true, meta: 'Sair do pacto remove metade das humanidades dadas.' }),
  py('great-fireball', 'Great Fireball', 'quelana', 'Compre de Quelana.', { meta: 'Requer a chama em +10 (Laurentius) para virar aprendiz.' }),
  py('firestorm', 'Firestorm', 'quelana', 'Compre de Quelana.'),
  py('fire-whip', 'Fire Whip', 'quelana', 'Compre de Quelana.'),
  py('great-combustion', 'Great Combustion', 'quelana', 'Compre de Quelana.'),
  py('undead-rapport', 'Undead Rapport', 'quelana', 'Compre de Quelana.'),
  py('fire-tempest', 'Fire Tempest', 'quelana', 'Ganha-se de Quelana depois de matar o chefe do caos, ou mate-a.', { warn: true, meta: 'Compre tudo antes de matá-la: matar encerra a venda.' }),
  py('chaos-fire-whip', 'Chaos Fire Whip', 'mundo', 'Baú antes do corredor longo até o chefe do caos.'),
  py('fire-surge', 'Fire Surge', 'mundo', 'Drop de zumbi tóxico atrás de parede ilusória perto dos Bonewheel Skeletons no Painted World.', { warn: true }),
  py('acid-surge', 'Acid Surge', 'mundo', 'Cadáver no Painted World of Ariamis.'),
  py('power-within', 'Power Within', 'mundo', 'Atrás de um parasita grande em Blighttown.'),
];

export const MIRACLES = [
  mi('heal', 'Heal', 'petrus', 'Clérigo (início); Petrus 4.000, Patches 5.000 ou Reah 1.000 almas.'),
  mi('great-heal-excerpt', 'Great Heal Excerpt', 'petrus', 'Petrus 10.000, Patches 10.000 ou Reah 2.000 almas.'),
  mi('great-heal', 'Great Heal', 'petrus', 'Reah, 10.000 almas.'),
  mi('force', 'Force', 'petrus', 'Petrus 4.000 ou Reah 1.000 almas.'),
  mi('wrath', 'Wrath of the Gods', 'petrus', 'Reah, 10.000 almas.'),
  mi('magic-barrier', 'Magic Barrier', 'petrus', 'Reah, 6.000 almas.'),
  mi('homeward', 'Homeward', 'petrus', 'Petrus 8.000 ou Reah 1.000 almas.'),
  mi('seek-guidance', 'Seek Guidance', 'petrus', 'Petrus 2.000 ou Reah 500 almas.'),
  mi('replenishment', 'Replenishment', 'petrus', 'Reah, depois de resgatá-la dos dois ocos em Tomb of the Giants.', {
    warn: true, meta: 'Resgate-a e compre na igreja logo em seguida.' }),
  mi('karmic-justice', 'Karmic Justice', 'oswald', 'Oswald of Carim, 40.000 almas.'),
  mi('emit-force', 'Emit Force', 'siegmeyer', 'Siegmeyer em Firelink após limpar Anor Londo; responda "sim" sobre ter aberto os portões de Sen\'s Fortress.', { warn: true }),

  mi('soothing-sunlight', 'Soothing Sunlight', 'pacto', 'Pisaca, Elder Sister (exige Princess\'s Guard).'),
  mi('bountiful-sunlight', 'Bountiful Sunlight', 'pacto', 'Pisaca, Little Sister (exige Princess\'s Guard).'),
  mi('lightning-spear', 'Lightning Spear', 'pacto', 'Pacto Warrior of Sunlight.'),
  mi('great-lightning-spear', 'Great Lightning Spear', 'pacto', 'Warrior of Sunlight, rank 1.'),
  mi('sunlight-spear', 'Sunlight Spear', 'pacto', 'Warrior of Sunlight, rank 1 + alma do chefe final.', { full: 'Warrior of Sunlight, rank 1 + Soul of Gwyn.' }),
  mi('sunlight-blade', 'Sunlight Blade', 'pacto', 'Derrote o chefe da cripta de Anor Londo pela névoa do altar Darkmoon.', {
    warn: true, verify: true, meta: 'Segundo a fonte: rompe o juramento Darkmoon e torna hostil a guardiã de Anor Londo até o próximo ciclo. Conferir.' }),
  mi('darkmoon-blade', 'Darkmoon Blade', 'pacto', 'Pacto Blade of the Darkmoon: ofereça 10 Souvenirs of Reprisal para o rank 1.'),
  mi('gravelord-sword-dance', 'Gravelord Sword Dance', 'pacto', 'Pacto Gravelord Servant.'),
  mi('gravelord-greatsword-dance', 'Gravelord Greatsword Dance', 'pacto', 'Gravelord Servant, rank +1.'),

  mi('tranquil-walk-peace', 'Tranquil Walk of Peace', 'mundo', 'Catacombs: da 2ª fogueira, atravesse a ponte até a torre espiral com 2 esqueletos, quebre a parede e suba a escada até o necromante.', { warn: true, meta: 'A escada é fácil de perder.' }),
  mi('great-magic-barrier', 'Great Magic Barrier', 'mundo', 'The Great Hollow / Ash Lake.'),
  mi('vow-of-silence', 'Vow of Silence', 'mundo', 'Painted World of Ariamis.'),
];

export const ALL_SPELLS = [...SORCERIES, ...PYROMANCIES, ...MIRACLES];
