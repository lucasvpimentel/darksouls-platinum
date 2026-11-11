// Compêndio de lore. Texto próprio, resumido a partir do consenso da comunidade; nada é transcrição de diálogos do jogo.
// sp:true = spoiler (fica oculto com o Modo Sem Spoilers ativo, até clicar em "Revelar").
// theory:true = interpretação de fãs, não fato confirmado no jogo. verify:true = detalhe do briefing ainda não conferido.
export const TABS = { criacao: '🔥 Criação e Primeira Chama', reinos: '🏰 Reinos além de Lordran', tragedias: '👑 Tragédias e Lordes', finais: '🐍 Dilema dos Dois Finais' };

const e = (id, title, text, o = {}) => ({ id: 'l-' + id, title, text, ...o });

export const TIMELINE = [
  e('t1', 'Era dos Antigos', 'Um mundo informe, cinzento e coberto de névoa, de árvores gigantes e dragões de pedra que não envelhecem.'),
  e('t2', 'A Primeira Chama', 'Uma chama surge e traz as disparidades: calor e frio, vida e morte, luz e sombra.'),
  e('t3', 'As Almas dos Lordes', 'Quatro seres encontram almas poderosas na chama e se tornam os Lordes.'),
  e('t4', 'A Guerra dos Dragões', 'Com a ajuda de Seath, que trai os seus, os dragões imortais são derrotados.'),
  e('t5', 'Era do Fogo', 'Gwyn lidera os deuses; Anor Londo floresce e a civilização cresce em torno da chama.'),
  e('t6', 'Queda de Izalith', 'A Bruxa de Izalith tenta recriar a chama e libera o caos, que gera os demônios.', { sp: true }),
  e('t7', 'Queda de Oolacile', 'Oolacile desperta algo que não devia e é consumida pelo Abismo (conteúdo do DLC).', { sp: true }),
  e('t8', 'A Maldição', 'A chama enfraquece, a Marca Morta surge e os mortos-vivos são afastados da sociedade.', { sp: true }),
  e('t9', 'O sacrifício de Gwyn', 'Gwyn se entrega à chama para prolongá-la, e vira o Lord of Cinder.', { sp: true }),
  e('t10', 'O despertar', 'Você acorda numa cela do asilo, no fim da Era do Fogo.'),
];

export const ORIGENS = [
  e('antigos', 'A Era dos Antigos', 'Antes da chama não havia diferença entre as coisas. Os dragões imortais dominavam um mundo de pedra e névoa.'),
  e('chama', 'A Primeira Chama e a Disparidade', 'O fogo criou contraste: onde havia uniformidade surgiram calor e frio, vida e morte, luz e escuridão. Com a disparidade veio também a possibilidade de buscar o poder dela.'),
  e('nito', 'Gravelord Nito', 'O primeiro dos mortos. Sua alma dá poder sobre a morte, as doenças e a decomposição.'),
  e('izalith', 'A Bruxa de Izalith', 'Senhora de uma antiga feitiçaria de fogo, com suas filhas do caos. Ela se tornou a origem das piromancias.'),
  e('gwyn', 'Lord Gwyn', 'O senhor da luz do sol e do relâmpago. Lidera a guerra contra os dragões e funda Anor Londo.'),
  e('pygmy', 'O Pigmeu Furtivo', 'Tão discreto que quase ninguém o menciona. Encontrou a Dark Soul, que se dividiu em fragmentos (as humanidades), e é tido como origem da humanidade.', { theory: true }),
  e('seath', 'Seath, o Sem Escamas', 'Um dragão nascido sem as escamas da imortalidade. Trai os seus e entrega aos deuses as fraquezas dos dragões: o relâmpago de Gwyn, o fogo das bruxas e a podridão de Nito.'),
];

export const REINOS = [
  { id: 'l-astora', name: 'Astora', blurb: 'Reino de cavaleiros honrados e artesãos de elite, protetor do fogo.', figs: ['Solaire de Astora', 'Andre (ferreiro)', 'Oscar de Astora', 'Anastacia'], gear: ['Elite Knight Armor', "Astora's Straight Sword", 'Crest Shield'] },
  { id: 'l-catarina', name: 'Catarina', blurb: 'Terra de banquetes e cavalheirismo, conhecida pela armadura curva em forma de cebola, que desvia golpes com perfeição.', figs: ['Siegmeyer de Catarina', 'Sieglinde'], gear: ['Catarina Armor'] },
  { id: 'l-carim', name: 'Carim', blurb: 'Aristocracia sombria, de assassinos refinados e devotos da deusa Velka (o pecado).', figs: ['Lautrec', 'Oswald de Carim', 'Ingward'], gear: ['Shotel', 'Parrying Dagger', 'Purging Stone'] },
  { id: 'l-thorolund', name: 'Thorolund', blurb: 'Teocracia ligada ao Caminho Branco. Hostil à feitiçaria e aos dragões, confina mortos-vivos em asilos.', figs: ['Petrus', 'Reah', 'Vince', 'Nico', 'Paladin Leeroy'], gear: [] },
  { id: 'l-vinheim', name: 'Vinheim e a Dragon School', blurb: 'Centro do estudo formal da feitiçaria, fundado sobre o legado de Seath. Famoso por sábios e por magias de som e queda controlada.', figs: ['Big Hat Logan', 'Griggs', 'Rickert'], gear: [] },
  { id: 'l-swamp', name: 'Great Swamp', blurb: 'Terra de exilados e hereges que desenvolveram a piromancia a partir dos ensinamentos de Quelana.', figs: ['Laurentius', 'Eingyi', 'Quelana'], gear: [] },
  { id: 'l-oolacile', name: 'Oolacile', blurb: 'Antigo reino que manipulava a luz e a ilusão. Foi destruído ao despertar o Humano Primordial, e o Abismo o engoliu (DLC).', figs: ['Dusk', 'Elizabeth'], gear: [], sp: true },
];

export const TRAGEDIAS = [
  e('gwyn-pecado', 'O pecado de Gwyn e os Black Knights', 'Para adiar a Era das Trevas, Gwyn entrega a própria alma à chama e vira o Lord of Cinder. Os cavaleiros que o seguiram aparecem queimados nos Black Knights.', { sp: true, verify: true }),
  e('izalith-chaos', 'A catástrofe de Izalith', 'Ao tentar recriar a Primeira Chama, a Bruxa gerou a Chama do Caos, que consumiu Izalith. Dela vieram os demônios e filhas deformadas, como Quelaag e a mulher dos ovos.', { sp: true }),
  e('artorias', 'Artorias e Sif', 'Artorias foi vencido e corrompido pelo Abismo de Manus. Quem enfrenta Manus no DLC é você; o lobo Sif guarda o túmulo do cavaleiro.', { sp: true, verify: true }),
  e('anor', 'A farsa de Anor Londo', 'A luz e a princesa Gwynevere são uma ilusão mantida por Gwyndolin, o Dark Sun. Os deuses se foram; a cidade é um lugar vazio sob uma noite fingida.', { sp: true }),
  e('newlondo', 'A inundação de New Londo', 'Por ordem dos deuses a cidade foi selada e inundada para conter o que nasceu nela: os Four Kings e os Darkwraiths. Os detalhes de quem executou o ato variam entre fontes.', { sp: true, verify: true }),
  e('pinwheel', 'O drama de Pinwheel', 'Um necromante cercado por três máscaras e corpos fundidos. A leitura comum é que tentou trazer de volta a família morta; é interpretação, o jogo não afirma.', { sp: true, theory: true }),
];

export const SERPENTES = [
  ['Ideologia', 'Prolongar a Era do Fogo.', 'Iniciar a Era das Trevas, a era dos homens.'],
  ['O discurso', 'Você é o escolhido que vai quebrar a maldição ao reacender a chama.', 'A maldição existe porque os deuses temiam o poder da Dark Soul humana.'],
  ['O que cala', 'Que acender a chama exige sacrificar o herói como combustível.', 'A corrupção e a loucura que o Abismo pode trazer (vistas em Oolacile e New Londo).'],
  ['Final', 'To Link the Flame: o sacrifício estende o domínio dos deuses por mais um ciclo.', 'Dark Lord: você recusa a chama e inaugura a era dos homens.'],
];

// Árvore de relações: x,y no viewBox 800x420
const n = (id, name, x, y, g) => ({ id, name, x, y, g });
export const NODES = [
  n('gwyn', 'Gwyn', 400, 50, 'deus'), n('gwynevere', 'Gwynevere', 220, 150, 'deus'), n('gwyndolin', 'Gwyndolin', 400, 150, 'deus'), n('banido', 'Filho banido', 580, 150, 'deus'),
  n('ornstein', 'Ornstein', 130, 260, 'cav'), n('artorias', 'Artorias', 300, 260, 'cav'),
  n('nito', 'Nito', 560, 260, 'lord'), n('izalith', 'Bruxa de Izalith', 700, 260, 'lord'), n('quelaag', 'Quelaag', 700, 360, 'filha'),
  n('pygmy', 'Pigmeu Furtivo', 460, 360, 'lord'), n('humanos', 'Humanidade', 300, 360, 'hum'),
  n('frampt', 'Frampt', 80, 360, 'serp'), n('kaathe', 'Kaathe', 80, 100, 'serp'),
];
export const LINKS = [
  ['gwyn', 'gwynevere'], ['gwyn', 'gwyndolin'], ['gwyn', 'banido'], ['gwyn', 'ornstein'], ['gwyn', 'artorias'],
  ['izalith', 'quelaag'], ['pygmy', 'humanos'], ['frampt', 'gwyn'], ['kaathe', 'pygmy'], ['gwyn', 'nito'], ['gwyn', 'izalith'], ['gwyn', 'pygmy'],
];
