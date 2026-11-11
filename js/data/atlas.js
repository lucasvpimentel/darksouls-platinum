// Atlas: áreas, conexões e layout do diagrama. Fonte: briefing do projeto (matriz de interconectividade); verify.
// x,y = centro do nó no viewBox 1000x720. dead = beco sem saída. gated = exige o Lordvessel.
export const DSMAP_URL = 'https://dsmap.link/#/ds1';

const a = (id, name, x, y, o = {}) => ({ id, name, x, y, ...o });
export const AREAS = [
  a('asylum', 'Northern Undead Asylum', 500, 50),
  a('firelink', 'Firelink Shrine', 500, 150),
  a('catacombs', 'The Catacombs', 680, 150),
  a('tomb', 'Tomb of the Giants', 850, 150, { dead: true }),
  a('newlondo', 'New Londo Ruins', 300, 150),
  a('abyss', 'The Abyss', 130, 150, { dead: true }),
  a('altar', 'Firelink Altar', 130, 50),
  a('kiln', 'Kiln of the First Flame', 310, 50, { gated: true }),
  a('burg', 'Undead Burg', 400, 260),
  a('parish', 'Undead Parish', 600, 260),
  a('darkroot', 'Darkroot Garden', 790, 260),
  a('sens', "Sen's Fortress", 600, 370),
  a('anor', 'Anor Londo', 780, 450),
  a('archives', "The Duke's Archives", 920, 540),
  a('crystal', 'Crystal Cave', 920, 650, { dead: true }),
  a('painted', 'Painted World of Ariamis', 700, 570, { dead: true }),
  a('depths', 'The Depths', 230, 300),
  a('basin', 'Darkroot Basin', 440, 390),
  a('blight', 'Blighttown', 230, 430),
  a('hollow', 'The Great Hollow', 90, 430),
  a('ashlake', 'Ash Lake', 90, 560, { dead: true }),
  a('valley', 'Valley of Drakes', 420, 510),
  a('quelaag', "Quelaag's Domain", 250, 560),
  a('demon', 'Demon Ruins', 250, 670),
  a('izalith', 'Lost Izalith', 450, 670, { dead: true }),
];

// [a, b, nota, opções] — k: chave/atalho; d: mão única a→b; g: portão do Lordvessel
const e = (a, b, n, o = {}) => ({ a, b, n, ...o });
export const EDGES = [
  e('asylum', 'firelink', 'Voo do corvo gigante (ida e retorno secreto).', { d: 1 }),
  e('firelink', 'burg', 'Caminho principal.'),
  e('firelink', 'parish', 'Elevador duplo até a Parish.', { k: 1 }),
  e('firelink', 'newlondo', 'Elevador até as ruínas.', { k: 1 }),
  e('firelink', 'catacombs', 'Escadarias para o cemitério.'),
  e('burg', 'parish', 'Ponte principal.'),
  e('burg', 'basin', 'Torre de Havel: Watchtower Key ou Master Key.', { k: 1 }),
  e('burg', 'depths', 'Porta da torre inferior: Basement Key.', { k: 1 }),
  e('parish', 'darkroot', 'Passagem junto à oficina de Andre.'),
  e('parish', 'sens', 'Portão que abre com os dois sinos.', { k: 1 }),
  e('depths', 'blight', 'Key to the Depths + portão de madeira (Blighttown Key).', { k: 1 }),
  e('blight', 'valley', 'Andaimes superiores; atalho da roda d\'água.'),
  e('blight', 'hollow', 'Parede falsa na árvore oca.', { k: 1 }),
  e('blight', 'quelaag', 'Entrada de teia no pântano.'),
  e('hollow', 'ashlake', 'Descida vertical de galhos.'),
  e('quelaag', 'demon', 'Descida para o lago de lava, pós-sino.'),
  e('demon', 'izalith', 'Leito de lava e pontes de pedra (atalho da porta de 30 humanidades).'),
  e('darkroot', 'basin', 'Trilha de penhasco para a bacia inferior.'),
  e('basin', 'valley', 'Caverna de passagem com fogueira.'),
  e('valley', 'newlondo', 'Portão de ferro.', { k: 1 }),
  e('newlondo', 'abyss', 'Poço do Abismo (exige Covenant of Artorias).', { k: 1 }),
  e('abyss', 'altar', 'Via Kaathe até o Firelink Altar.'),
  e('altar', 'kiln', 'Aberto ao depositar as 4 Grandes Almas no Lordvessel.', { g: 1 }),
  e('sens', 'anor', 'Transporte aéreo por demônios alados no telhado.'),
  e('anor', 'archives', 'Balcão superior de Anor Londo.'),
  e('anor', 'painted', 'Quadro gigante (exige a Peculiar Doll). Volta pulando do penhasco.', { d: 1 }),
  e('archives', 'crystal', 'Saída inferior dos jardins de cristal.'),
  e('catacombs', 'tomb', 'Fosso do Pinwheel até a descida da tumba.'),
];

export const ROUTE_FOR = { parish: 'burg', blight: 'depths', hollow: 'ashlake', demon: 'izalith', crystal: 'archives' };
export const byId = Object.fromEntries(AREAS.map(x => [x.id, x]));
export const neighbors = id => EDGES.filter(x => x.a === id || x.b === id).map(x => ({ other: byId[x.a === id ? x.b : x.a], ...x }));
