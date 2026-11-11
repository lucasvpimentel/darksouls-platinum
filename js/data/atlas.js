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

// Mapas do guia da Steam #3094082097 (compilação de terceiros, autor "Baba Yaga"), carregados direto da CDN da Steam.
// NÃO são copiados para o repositório: o guia não traz licença. Imagem local em assets/maps/ tem prioridade.
const U = h => `https://images.steamusercontent.com/ugc/${h}/`;
export const MAP_CREDIT = 'Mapa do guia da Steam #3094082097 (autor: Baba Yaga), exibido a partir de images.steamusercontent.com.';
export const MAP_IMAGES = {
  world: [U('2263683717025601691/14873879D44967B97523ACDAC430D67AD7D7BF87')],
  asylum: [U('2263683717025604702/06D21DB15399BBBE41ED107159029C20F51D30D3')],
  firelink: [U('2263683717025605946/115A0E3A902FAFF16C1DB5292318FB970B41CAD2')],
  burg: [U('2263683717025611347/A1C5A700EEE7FA794C785C2595BBC0FEF119A480')],
  parish: [U('2263683717025612877/732528D17EFDA39850574F820BB19E1ED0929B82')],
  depths: [U('2263683717025616405/25B5622B6621D93794E1E072F17E987D65373218')],
  blight: [U('2263683717025618243/1637F9A6F5BF5AA964DC4B45BCF5CC1089494646')],
  hollow: [U('2263683717025619476/C6A31D9E415235728B64D3DFDBC01EB6D4EB819C')],
  ashlake: [U('2263683717025622327/77BDE448D08F4FF75A61884358D32E3412EABC8E')],
  sens: [U('2263683717025625538/0C9858E9EA31742C78DAAB1B4BC4BAFD2DD29258')],
  anor: [U('2263683717025628968/FE4F7F3E736A3BEC7F3C94D3D01DCB8B20B7CAC3'), U('2263683717025628976/A95722E94F899FE984D7D10F6805CBAB7351FE0D')],
  painted: [U('2263683717025631553/85EB13C2B8680AA17E7714FA273CA9A32A70ED4B')],
  darkroot: [U('2263683717025749772/80148490DC8CE2319FCA356F41A3E406EE1449DA')],
  basin: [U('2263683717025755122/86352BB4321118FC01B106C89CAE2041561900CC')],
  catacombs: [U('2263683717025642664/9E719C6D07CC214BBC956436F8D2BE535154B3AE')],
  tomb: [U('2263683717025648734/9052CDD23B44626D0B29F3DF985B3E6C1CC6A2C3')],
  newlondo: [U('2263683717025650427/9C02064BB36F5F2AFEC511DEA034A58E84F9157D')],
  archives: [U('2263683717025652357/CE06FAB39024B5A4D0822668E89EB4DD41770193')],
  crystal: [U('2263683717025677346/A74B9AE25A3A9B33A74E44DCD1803B3285FC2E08')],
  demon: [U('2263683717025685276/E08BEFF02F6DC9C0E118CDAC604DF62B2004A48A')],
  izalith: [U('2263683717025679611/E7AE7F0347DC6C2F9EA318C97FD5451447DD13E6')],
  // sem mapa no guia: quelaag, valley, abyss, altar, kiln (mostram a planta vetorial)
};
