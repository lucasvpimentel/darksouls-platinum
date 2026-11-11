// Armas/escudos raros do Knight's Honor. Fonte: guia Knight's Honor da Fextralife + checklist da Steam (conferidos entre si).
// ATENÇÃO: as fontes listam 49 itens (15 almas, 6 caudas, 2 pactos, 9 tesouros, 17 drops/NPCs), não 50 como no briefing inicial.
// Possível divergência de 1 item e do desmembramento 12/15 — conferir no jogo (o troféu só dispara com todos).
// IDs estáveis (chaves do save).
export const GROUPS = { boss: 'Almas de chefe', cauda: 'Caudas', pacto: 'Pactos', tesouro: 'Tesouros', drop: 'Drops e NPCs' };
export const SIF_IDS = ['w-greatshield-artorias', 'w-gs-artorias-cursed', 'w-gs-artorias-true'];

const w = (id, name, group, safe, o = {}) => ({ id: 'w-' + id, name, group, tag: group, safe, ...o });
const FORJA = 'Transposição: Giant Blacksmith (Anor Londo), 5000 almas.';

export const WEAPONS = [
  // Almas de chefe (base +10 + alma)
  w('chaos-blade', 'Chaos Blade', 'boss', 'Katana +10 + Soul of Quelaag.', { meta: FORJA }),
  w('crystal-ring', 'Crystal Ring Shield', 'boss', 'Escudo ou buckler +10 + Soul of the Moonlight Butterfly.', { meta: FORJA }),
  w('darkmoon-bow', 'Darkmoon Bow', 'boss', 'Arco +10 + Soul of Gwyndolin.', { meta: FORJA }),
  w('dragon-bone-fist', 'Dragon Bone Fist', 'boss', 'Cestus ou garra +10 + Core of an Iron Golem.', { meta: FORJA }),
  w('dragonslayer-spear', 'Dragonslayer Spear', 'boss', 'Lança ou rapieira +10 + Soul of Ornstein.', { meta: FORJA }),
  w('golem-axe', 'Golem Axe', 'boss', 'Machado +10 + Core of an Iron Golem.', { meta: FORJA }),
  w('great-lord', 'Great Lord Greatsword', 'boss', 'Adaga, espada ou espada grande +10 + alma do chefe final. Só em NG+.',
    { full: 'Adaga, espada ou espada grande +10 + Soul of Gwyn. Só em NG+.', warn: true, meta: FORJA }),
  w('greatshield-artorias', 'Greatshield of Artorias', 'boss', 'Escudo ou buckler +10 + Soul of Sif. (1ª das 3 almas de Sif)', { meta: FORJA }),
  w('gs-artorias-cursed', 'Greatsword of Artorias (Cursed)', 'boss', 'Adaga, espada ou espada grande +10 + Soul of Sif. Versão amaldiçoada: exige 18 Fé e 18 Int.', { meta: FORJA }),
  w('gs-artorias-true', 'Greatsword of Artorias', 'boss', 'Broken Sword +10 + Soul of Sif. Broken Swords caem de zumbis/Defiled em Blighttown. Exige 20 Fé e 20 Int.', { meta: FORJA }),
  w('lifehunt', 'Lifehunt Scythe', 'boss', 'Halberd, foice ou chicote +10 + Soul of Priscilla (a alma só ascende esta arma).', { meta: FORJA }),
  w('mbh', 'Moonlight Butterfly Horn', 'boss', 'Lança ou rapieira +10 + Soul of the Moonlight Butterfly.', { meta: FORJA }),
  w('quelaag-fury', "Quelaag's Furysword", 'boss', 'Espada curva +10 + Soul of Quelaag (um scimitar serve).', { meta: FORJA }),
  w('smough-hammer', "Smough's Hammer", 'boss', 'Martelo ou martelo grande +10 + Soul of Smough.', { meta: FORJA }),
  w('tin-darkmoon', 'Tin Darkmoon Catalyst', 'boss', "Catalisador + Soul of Gwyndolin. Use o Sorcerer's Catalyst (o original não ascende).", { meta: FORJA }),

  // Caudas
  w('dragon-greatsword', 'Dragon Greatsword', 'cauda', 'Corte a cauda do Ancient Dragon em Ash Lake SEM atacar o corpo (quebra o pacto).', { warn: true }),
  w('dkg', 'Dragon King Greataxe', 'cauda', 'Corte a cauda do Gaping Dragon nas Depths.'),
  w('drake-sword', 'Drake Sword', 'cauda', 'Corte a cauda do Red Drake (Bridge Wyvern) no Undead Burg: flechas por baixo da ponte ou golpe quando ele pousar.'),
  w('moonlight-gs', 'Moonlight Greatsword', 'cauda', 'Corte a cauda de Seath em Crystal Cave, só depois de quebrar o cristal (impossível no 1º encontro).', { warn: true }),
  w('priscilla-dagger', "Priscilla's Dagger", 'cauda', 'Corte a cauda de Priscilla no Painted World. Marque-a com faca de arremesso para rastrear a invisibilidade.', { warn: true }),
  w('gargoyle-axe', 'Gargoyle Tail Axe', 'cauda', 'Corte a cauda do primeiro Bell Gargoyle em Undead Parish (mais fácil antes do segundo entrar). Também nas gárgulas do início de Anor Londo.'),

  // Pactos
  w('dark-hand', 'Dark Hand', 'pacto', 'Presente ao entrar no pacto Darkwraith; também pode cair de Darkwraith Knights em New Londo Ruins.', { warn: true }),
  w('gravelord-sword', 'Gravelord Sword', 'pacto', 'Presente ao entrar no pacto Gravelord Servant.'),

  // Tesouros
  w('astora-sword', "Astora's Straight Sword", 'tesouro', 'Cadáver em Valley of Drakes, ao lado do Undead Dragon.'),
  w('bi-greatshield', 'Black Iron Greatshield', 'tesouro', 'Cadáver em Anor Londo, à esquerda da entrada do Painted World.'),
  w('bloodshield', 'Bloodshield', 'tesouro', 'Painted World, na ponte depois do Undead Dragon.'),
  w('dragon-crest', 'Dragon Crest Shield', 'tesouro', 'Cadáver em Valley of Drakes, ao lado do Undead Dragon.'),
  w('dragon-tooth', 'Dragon Tooth', 'tesouro', 'Baú em Anor Londo atrás de parede oculta na lareira, junto do equipamento de Havel.'),
  w('dragonslayer-greatbow', 'Dragonslayer Greatbow', 'tesouro', 'Cadáver em Anor Londo: depois do Giant Blacksmith, suba a escada do salão principal e saia pela janela quebrada à direita.'),
  w('effigy', 'Effigy Shield', 'tesouro', 'Cadáver em Tomb of the Giants, logo antes da segunda fogueira.'),
  w('havel-greatshield', "Havel's Greatshield", 'tesouro', 'Baú atrás da mesma parede oculta da lareira de Anor Londo.'),
  w('velka-rapier', "Velka's Rapier", 'tesouro', 'Cadáver no Painted World, depois da porta que exige a Annex Key.'),

  // Drops e NPCs
  w('bk-greataxe', 'Black Knight Greataxe', 'drop', 'Drop aleatório de Black Knight com machado grande.'),
  w('bk-greatsword', 'Black Knight Greatsword', 'drop', 'Drop aleatório de Black Knight com espada grande.'),
  w('bk-halberd', 'Black Knight Halberd', 'drop', 'Drop aleatório de Black Knight com halberd.'),
  w('bk-shield', 'Black Knight Shield', 'drop', 'Drop aleatório de qualquer Black Knight.'),
  w('bk-sword', 'Black Knight Sword', 'drop', 'Drop aleatório de Black Knight com espada.'),
  w('channeler-trident', "Channeler's Trident", 'drop', "Drop raro de Channelers (há três que renascem em Duke's Archives)."),
  w('crest-shield', 'Crest Shield', 'drop', 'Cai de Oscar (agora oco) no Undead Asylum revisitado.'),
  w('crescent-axe', 'Crescent Axe', 'drop', 'Drop de Patches ou compra com ele em Firelink Shrine depois que ele se muda.', { warn: true }),
  w('demon-spear', "Demon's Spear", 'drop', 'Drop raro de Bat Wing Demon em Anor Londo com sol. Também vendido por Shiva (pacto Forest Hunter).'),
  w('giant-halberd', "Giant's Halberd", 'drop', 'Drop raro dos giant gold knights em Anor Londo com sol; compra no Giant Blacksmith por 5000 almas.'),
  w('grant', 'Grant', 'drop', 'Mate o invasor Paladin Leeroy em Tomb of the Giants, antes do domínio de Nito.', { warn: true }),
  w('sanctus', 'Sanctus', 'drop', 'Mesmo invasor: Paladin Leeroy em Tomb of the Giants.', { warn: true }),
  w('sk-shield', 'Silver Knight Shield', 'drop', 'Drop aleatório de Silver Knights em Anor Londo.'),
  w('sk-spear', 'Silver Knight Spear', 'drop', 'Drop aleatório de Silver Knight com lança em Anor Londo.'),
  w('sk-sword', 'Silver Knight Straight Sword', 'drop', 'Drop aleatório de Silver Knight com espada em Anor Londo.'),
  w('stone-greatshield', 'Stone Greatshield', 'drop', 'Drop aleatório de Stone Knights em Darkroot Garden.'),
  w('stone-greatsword', 'Stone Greatsword', 'drop', 'Drop raro de Stone Knights em Darkroot Garden; compra com Shiva no pacto Forest Hunter.'),
];

export const WEAPON_IDS = WEAPONS.map(x => x.id);
