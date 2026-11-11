// Questlines de NPCs, em ordem de aparição. Fonte: guia de questlines da Steam #2100008150 (comunidade; a própria página
// avisa que há pontos contestados) + guias da Fextralife para magias/pactos. verify:true = ponto contestado ou não conferido.
// safe = instrução mecânica; full = versão com o desfecho da trama (usada só com o Modo Sem Spoilers desativado).
// IDs estáveis (chaves do save).
export const RULES = [
  'Esgote o diálogo: fale até o NPC repetir a primeira frase. Sem isso ele pode não mudar de lugar e a quest não avança.',
  'Fale com os NPCs de cada área antes de matar chefes ou avançar: eventos de história podem movê-los, mudá-los ou matá-los.',
  'Alguns NPCs reagem à sua forma (humana ou hollow). Reah, por exemplo, deve ser atendida em forma humana.',
  'Compre tudo de um mercador-NPC antes de avançar a quest dele: vários param de vender ou saem de cena.',
];

const s = (id, safe, o = {}) => ({ id, safe, ...o });

export const QUESTS = [
  { id: 'petrus', npc: 'Petrus e Reah (Thorolund)', where: 'Firelink Shrine → Tomb of the Giants → Undead Parish', steps: [
    s('p1', 'Em Firelink, entre no pacto Way of White com Petrus e esgote o diálogo.'),
    s('p2', 'Depois que o Capra Demon morrer, Reah aparece em Firelink: compre os milagres dela.'),
    s('p3', 'Se você falar com Petrus de novo, o grupo parte para as Catacombs. Eles também partem sozinhos quando Pinwheel morre.', { warn: true }),
    s('p4', 'Em Tomb of the Giants, resgate Reah e o grupo (estão ocos, nos recantos escuros abaixo do penhasco de Patches).', { warn: true }),
    s('p5', 'Volte a Firelink e lide com Petrus: se ele viver, Reah morre e a quest dela termina.', { warn: true, sp: true, verify: true, full: 'Volte a Firelink e mate Petrus. Se ele viver, ele mata Reah (a fonte contesta: comprar tudo de Reah antes pode salvá-la).' }),
    s('p6', 'Fale com Reah na Old Church de Undead Parish e compre os milagres restantes.'),
  ]},
  { id: 'lautrec', npc: 'Knight Lautrec', where: 'Undead Parish → Firelink → Anor Londo', steps: [
    s('l1', 'Liberte-o da cela no 2º andar da Old Church (Undead Parish).'),
    s('l2', 'NÃO colete 3 Firekeeper Souls enquanto ele estiver vivo.', { warn: true }),
    s('l3', 'Depois do 2º sino a Firekeeper de Firelink morre; pegue o Blackeye Orb no corpo dela.', { sp: true, full: 'Depois do 2º sino, Lautrec mata a Firekeeper de Firelink; pegue o Blackeye Orb no corpo dela.' }),
    s('l4', 'Em Anor Londo, use o Blackeye Orb no Main Hall para encerrar a questline.', { sp: true, full: 'Em Anor Londo, use o Blackeye Orb no Main Hall para invadir e matar Lautrec. A questline termina.' }),
    s('l5', 'Não use Firekeeper Souls antes de devolver a alma da Firekeeper.', { warn: true }),
  ]},
  { id: 'solaire', npc: 'Solaire de Astora', where: 'Undead Burg → Anor Londo → Lost Izalith', steps: [
    s('s1', 'Fale com Solaire na ponte de Undead Burg e esgote o diálogo.'),
    s('s2', 'Fale de novo com ele em Anor Londo e esgote o diálogo.'),
    s('s3', 'Invoque-o contra o Centipede Demon em Lost Izalith.'),
    s('s4', 'Para salvá-lo, abra o atalho do caos (30 humanidades com o pacto Chaos Servant) ANTES de Bed of Chaos.', { warn: true, verify: true, sp: true, full: 'Solaire é infectado após o Centipede Demon. Para salvá-lo, gaste 30 humanidades com o Chaos Servant e liberte-o do acampamento atrás da parede. Se vencer Bed of Chaos antes, ele fica oco e você precisa matá-lo.' }),
  ]},
  { id: 'siegmeyer', npc: 'Siegmeyer e Sieglinde de Catarina', where: "Undead Parish → Sen's Fortress → Anor Londo → Lost Izalith → Ash Lake", steps: [
    s('g1', "Opcional: fale com Siegmeyer no portão de Sen's Fortress."),
    s('g2', "Em Sen's Fortress, gire a alavanca do rolo e fale com ele abaixo da rampa de terra."),
    s('g3', 'Em Anor Londo, resgate-o dos Silver Knights dentro do castelo (suba ao telhado e entre pela entrada oposta).'),
    s('g4', 'Em Firelink, esgote o diálogo.'),
    s('g5', 'Compre Poison Moss da vendedora feminina e leve-o a Siegmeyer, envenenado no fim de Lower Blighttown.', { warn: true }),
    s('g6', 'Em Lost Izalith, fale com ele e mate os inimigos mantendo a vida dele acima da metade, senão ele morre.', { warn: true }),
    s('g7', "Em Duke's Archives, liberte Sieglinde do Crystal Golem; em Firelink responda às perguntas dela."),
    s('g8', 'Em Ash Lake, encontre-a com o pai e receba o Titanite Slab. Fim da questline.', { sp: true, full: 'Em Ash Lake, Sieglinde encontra o pai oco, encerra o sofrimento dele e dá um Titanite Slab. Fim da questline.' }),
  ]},
  { id: 'griggs-logan', npc: 'Griggs e Big Hat Logan (feitiços)', where: "Undead Burg → Sen's Fortress → Duke's Archives", steps: [
    s('b1', 'Compre a Residence Key do mercador morto-vivo de Undead Burg.'),
    s('b2', 'Liberte Griggs em Lower Undead Burg com a chave; ele volta a Firelink. Compre tudo dele.', { warn: true }),
    s('b3', "Em Sen's Fortress, gire a alavanca do rolo, quebre a parede ao fim da rampa e liberte Logan (Master Key ou a chave da cela)."),
    s('b4', 'Compre todos os feitiços de Logan, em Firelink e depois em Duke\'s Archives.'),
    s('b5', "Em Duke's Archives, pegue a Archive Tower Giant Key no baú da escada que desmorona e liberte-o da cela da torre."),
    s('b6', 'Compre tudo de novo (feitiços de cristal) e esgote o diálogo; fale com ele de novo depois de Seath.'),
    s('b7', "Depois de Seath, ele fica na sala original do dragão em Duke's Archives (White Dragon Breath).", { sp: true, full: 'Logan fica oco e enlouquecido na sala original de Seath; matá-lo dá a armadura e o White Dragon Breath.' }),
  ]},
  { id: 'laurentius', npc: 'Laurentius do Grande Pântano', where: 'The Depths → Firelink', steps: [
    s('r1', 'Nas Depths, liberte-o do barril sem acertá-lo.', { warn: true }),
    s('r2', 'Esgote o diálogo. Sem ele não há compra de piromancias nem melhoria da chama.'),
    s('r3', 'Ele vai a Blighttown (a fonte contesta o gatilho: pegar Power Within no caminho).', { verify: true, sp: true, full: 'Ele vai a Blighttown, onde fica oco. A questline termina.' }),
  ]},
  { id: 'quelana', npc: 'Quelana de Izalith', where: 'Blighttown → Lost Izalith', steps: [
    s('q1', 'Melhore a Pyromancy Flame para +10 com Laurentius: Quelana só aparece no pântano com a chama em +10.', { warn: true }),
    s('q2', 'Compre TODAS as piromancias dela.', { warn: true }),
    s('q3', 'Se você falou com ela antes, ela pede para libertar a família derrotando o chefe do caos.', { sp: true, full: 'Ela pede para libertar a mãe e as irmãs derrotando Bed of Chaos.' }),
    s('q4', 'Depois do chefe do caos, volte a ela para a piromancia final (Fire Tempest).'),
  ]},
  { id: 'patches', npc: 'Patches', where: 'Tomb of the Giants → Firelink', steps: [
    s('t1', 'Em Tomb of the Giants, responda "não" a ele e deixe-o chutar você do penhasco; depois perdoe-o.', { sp: true, full: 'Em Tomb of the Giants, diga "não", deixe-o chutar você do penhasco e perdoe-o. Se não perdoar, ele dá uma Twin Humanity.' }),
    s('t2', 'Em Firelink, compre os itens dele (Crescent Axe etc.). A questline termina.'),
  ]},
  { id: 'dusk', npc: 'Dusk of Oolacile', where: "Duke's Archives", steps: [
    s('d1', 'Compre todos os feitiços dela antes de pegar o Broken Pendant: o sinal some até o DLC.', { warn: true }),
  ]},
  { id: 'crestfallen', npc: 'Crestfallen Warrior e Knight', where: 'Firelink Shrine → New Londo Ruins', steps: [
    s('c1', 'Fale com o Crestfallen Warrior em Firelink (recompensa pequena).'),
    s('c2', 'Fale com o Crestfallen Knight depois do 2º sino.'),
    s('c3', 'Ele reaparece em New Londo Ruins e ataca no início da área.', { sp: true, full: 'O Knight fica oco e ataca você no início de New Londo Ruins.' }),
  ]},
  { id: 'kaathe', npc: 'Kaathe (pacto Darkwraith)', where: 'Firelink Altar / Abismo', steps: [
    s('k1', 'NÃO deposite o Lordvessel no altar de Firelink.', { warn: true }),
    s('k2', 'Derrote os Four Kings com o Lordvessel ainda no inventário.', { warn: true }),
    s('k3', 'Fale com Kaathe e aceite o pacto Darkwraith.'),
  ]},
];

export const QUEST_STEP_IDS = QUESTS.flatMap(q => q.steps.map(x => 'q-' + q.id + '-' + x.id));
export const stepId = (q, x) => `q-${q.id}-${x.id}`;
