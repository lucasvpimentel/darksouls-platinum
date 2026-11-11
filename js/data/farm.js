// Farm spots. Fonte: briefing do projeto — NENHUM item foi conferido contra o jogo (verify em todos).
// Conflitos já conhecidos com guias conferidos: ver `conflito`.
export const GROUPS = { pacto: 'Itens de pacto', arma: 'Armas raras', titanita: 'Titanitas e materiais', almas: 'Almas' };

const f = (id, name, group, enemy, where, route, o = {}) => ({
  id: 'f-' + id, name, group, tag: group, safe: route, meta: `${enemy} · ${where}`, verify: true, ...o,
});

export const FARM = [
  // Pactos
  f('reprisal', 'Souvenir of Reprisal (Blade of the Darkmoon, 10)', 'pacto', 'Crow Demons', 'Painted World of Ariamis',
    'Suba a torre espiral a partir da fogueira do portão de atalho, abata os 4 corvos e volte com Homeward Bone (~1 min/ciclo).'),
  f('sunlight-medal', 'Sunlight Medal (Warrior of Sunlight, 10)', 'pacto', 'Insetos do túnel', 'Demon Ruins ↔ Lost Izalith',
    'Fogueira após o Demon Firesage ou a de Lost Izalith. Elimine os 9 insetos do corredor (~40 s/ciclo).'),
  f('eye-of-death', 'Eye of Death (Gravelord Servant, 10)', 'pacto', 'Basiliscos', 'The Depths / The Great Hollow',
    'Da fogueira de The Depths, desça o corredor reto, elimine 5 basiliscos e volte (~50 s).'),
  f('dragon-scale', 'Dragon Scale (Path of the Dragon)', 'pacto', 'Drakes', 'Valley of Drakes',
    'Entre pelo atalho de New Londo / Darkroot Basin e elimine os drakes da ponte estreita.'),
  f('humanity-early', 'Humanity — início', 'pacto', 'Ratos', 'The Depths', 'Corredor lateral da fogueira.'),
  f('humanity-mid', 'Humanity — meio', 'pacto', 'Pisacas', "Prisão de Duke's Archives", 'Criaturas azuis de tentáculos.'),
  f('humanity-late', 'Humanity — fim', 'pacto', 'Skeleton Babies', 'Tomb of the Giants, antes da arena de Nito', 'Esqueletos infinitos na água rasa.'),
  f('humanity-dlc', 'Humanity — DLC', 'pacto', 'Humanity Phantoms', 'Chasm of the Abyss', 'Considerado o melhor spot de humanidade (exige o DLC).'),

  // Armas raras
  f('channeler', "Channeler's Trident", 'arma', 'Channelers', "Duke's Archives",
    'Fogueira da varanda principal: suba, elimine os Channelers dos andares superiores e retorne. Drop raro.'),
  f('silver-knight', 'Silver Knight Sword / Spear / Shield', 'arma', 'Silver Knights', 'Anor Londo (palácio, fogueira de Solaire)',
    'Limpe os cavaleiros do corredor e da escadaria central (~45 s).'),
  f('black-knight', 'Black Knight Sword / Greatsword / Greataxe / Halberd / Shield', 'arma', 'Black Knights', 'Kiln of the First Flame',
    'Cavaleiros do caminho de cinzas renascem. Chance alta de drops de arma e titanita.', { conflito: 'Não confirmado: Black Knights costumam ser farmados em Darkroot Garden, Painted World etc.' }),
  f('stone', 'Stone Greatsword / Stone Greatshield', 'arma', 'Stone Knights', 'Darkroot Garden, antes da névoa da Moonlight Butterfly',
    'Drop aleatório; a espada também pode ser comprada de Shiva no pacto Forest Hunter.'),
  f('catch-pole', 'Titanite Catch Pole', 'arma', 'Titanite Demon', 'Lost Izalith (ponte curta)',
    'Briefing diz que um Titanite Demon respawna aqui.', { conflito: 'Guias conferidos dizem que o Catch Pole NÃO é necessário para o Knight\'s Honor, e o respawn é duvidoso.' }),

  // Titanitas
  f('darkwraith', 'Titanite Chunk / Slab', 'titanita', 'Darkwraiths', 'New Londo Ruins (piso drenado)',
    'Da fogueira de Firelink ou de Darkroot, desça o elevador e elimine os 11 Darkwraiths. ~2–4 Chunks por ciclo, chance de Slab.'),
  f('red', 'Red Titanite Chunk / Slab', 'titanita', 'Chaos Eaters', 'Lost Izalith (fosso de veneno)', 'Elimine os Chaos Eaters do fosso.'),
  f('blue', 'Blue Titanite Chunk / Slab', 'titanita', 'Crystal Butterflies', 'Crystal Cave (pontes invisíveis)', 'Borboletas das pontes invisíveis.'),
  f('white', 'White Titanite Chunk / Slab', 'titanita', 'Bone Towers e clones de Pinwheel', 'Tomb of the Giants (caverna antes de Nito)', 'Elimine as torres de ossos e os clones.'),
  f('twinkling', 'Twinkling Titanite / Purging Stone', 'titanita', 'Man-Eater Shells', 'Crystal Cave (frente à névoa de Seath) / Ash Lake', 'Ostras gigantes.'),
  f('demon-titanite', 'Demon Titanite', 'titanita', 'Titanite Demon', 'Lost Izalith (ponte)', 'Briefing: 2 garantidas por morte.', { conflito: 'Respawn do Titanite Demon duvidoso — conferir.' }),
  f('large-shards', 'Large / Green Titanite Shard', 'titanita', 'Sanguessugas gigantes', 'Blighttown (junto à fogueira do tronco)', 'Lesmas do pântano.'),
  f('moss', 'Moss Clump', 'titanita', 'Treants', 'Darkroot Garden', 'Plantas que dão Moss Clump.'),

  // Almas
  f('souls-early', 'Almas — início: ponte do dragão', 'almas', 'Hollows', 'Undead Burg', 'Suba o atalho da fogueira, pise na ponte para o sopro do dragão e desça. ~555 almas a cada 12 s.'),
  f('souls-mid', 'Almas — meio: Darkroot Garden', 'almas', 'Forest Hunters', 'Darkroot Garden', 'Abra a porta com a Crest of Artorias, atraia os 4 guerreiros e deixe-os saltar da escada de pedra para o abismo. ~7–10 mil almas (~40 s).'),
  f('souls-late', 'Almas — fim: Phalanx', 'almas', 'Phalanx', 'Painted World of Ariamis',
    'Com Fire Tempest/Chaos Storm/Wrath of the Gods + Covetous Silver Serpent Ring + Symbol of Avarice: corra até a estátua central, entre no pelotão e dispare a magia. ~7–10 mil almas a cada 25 s no NG.'),
];

export const FARM_IDS = FARM.map(x => x.id);
