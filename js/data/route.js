// Rota de mapas. IDs são ESTÁVEIS: nunca renomear/reutilizar (são as chaves do save).
// safe = instrução mecânica (modo sem spoilers). full = versão completa, usada só com o modo desativado.
// verify:true = dado vindo do prompt do projeto, ainda não conferido contra o jogo.
const i = (id, type, safe, o = {}) => ({ id, type, safe, ...o });

export const ROUTE = [
  { id: 'asylum', area: 'Northern Undead Asylum', items: [
    i('asylum-enkindle', 'key', 'Acenda a primeira fogueira no pátio. (Troféu Enkindle)'),
    i('asylum-estus', 'key', 'Fale com o cavaleiro ferido no andar superior e receba o Estus Flask. (Troféu Estus Flask)'),
    i('asylum-demon', 'boss', 'Derrote o chefe do tutorial.', { full: 'Derrote o Asylum Demon.' }),
    i('asylum-crow', 'key', 'Pegue a carona do corvo no ninho até Firelink Shrine. (Troféu Reach Lordran)'),
  ]},
  { id: 'firelink', area: 'Firelink Shrine', items: [
    i('fl-petrus', 'covenant', 'Way of White: fale com Petrus e aceite o juramento. (Troféu de pacto)'),
    i('fl-serpent', 'npc', 'NÃO deposite o Lordvessel no altar de Firelink antes de vencer os Four Kings (guarde-o no inventário).', { warn: true }),
  ]},
  { id: 'burg', area: 'Undead Burg e Undead Parish', items: [
    i('burg-taurus', 'boss', 'Derrote o Taurus Demon na ponte.'),
    i('burg-capra', 'boss', 'Derrote o Capra Demon no Lower Undead Burg.'),
    i('parish-tail', 'tail', 'Bell Gargoyles: corte a cauda de um gárgula antes de matá-lo.', { warn: true }),
    i('parish-bell1', 'boss', 'Derrote os Bell Gargoyles no telhado e toque o primeiro sino. (Troféu Ring the Bell)'),
    i('parish-sunlight', 'covenant', 'Warrior of Sunlight: reze no altar quebrado. Exige 25 de Fé OU ter ajudado ao menos 4 jogadores com o white soapstone. (Local divergente entre fontes: conferir.)', { verify: true }),
  ]},
  { id: 'darkroot', area: 'Darkroot Garden', items: [
    i('dr-hunter', 'covenant', 'Forest Hunter: compre a Crest of Artorias de Andre (ou siga pela Darkroot Basin), abra a porta e responda "sim" às duas perguntas de Alvina.'),
    i('dr-sif', 'boss', 'Derrote o grande lobo e recolha o anel de andar no Abismo. (Troféu Art of Abysswalking)'),
    i('dr-ember', 'item', 'Pegue a Enchanted Ember e a Divine Ember.', { verify: true }),
  ]},
  { id: 'depths', area: 'Depths e Blighttown', items: [
    i('depths-gaping', 'boss', 'Derrote o Gaping Dragon.'),
    i('depths-ember', 'item', 'Pegue a Large Ember (Depths).', { verify: true }),
    i('blight-swamp', 'key', 'Atravesse Blighttown até o domínio de Quelaag.'),
  ]},
  { id: 'quelaag', area: "Quelaag's Domain", items: [
    i('q-boss', 'boss', 'Derrote a criatura do domínio e toque o segundo sino. (Troféu Ring the Bell)'),
    i('q-chaos', 'covenant', 'Chaos Servant: depois de Quelaag, desça a escada além do sino, quebre a parede ilusória, fale com Eingyi e escolha "Enter Covenant" com a mulher junto à fogueira.'),
  ]},
  { id: 'sens', area: "Sen's Fortress", items: [
    i('sens-golem', 'boss', 'Derrote o Iron Golem e toque o círculo dourado. (Troféu Reach Anor Londo)'),
  ]},
  { id: 'anor', area: 'Anor Londo', items: [
    i('anor-os', 'boss', 'Derrote a dupla de cavaleiros no grande salão e fale com a divindade no altar superior. (Troféu Lordvessel)'),
    i('anor-pg', 'covenant', "Princess's Guard: ajoelhe-se e faça o juramento após receber o Lordvessel."),
    i('anor-darkmoon', 'covenant', 'Blade of the Darkmoon: pegue o Darkmoon Seance Ring nas Catacombs, equipe-o e ajoelhe-se na área da névoa abaixo da fogueira de Anor Londo (não atravesse).'),
    i('anor-gwyn', 'boss', 'Derrote o chefe da cripta. Faça o pacto da lua ANTES da luta.', { warn: true, verify: true }),
  ]},
  { id: 'painted', area: 'Painted World of Ariamis', items: [
    i('pw-tail', 'tail', 'Corte a cauda da guardiã ANTES de matá-la.', { warn: true }),
    i('pw-boss', 'boss', 'Derrote a guardiã.', { full: 'Derrote Crossbreed Priscilla.' }),
  ]},
  { id: 'catacombs', area: 'Catacombs', items: [
    i('cat-pinwheel', 'boss', 'Derrote Pinwheel. (Troféu Rite of Kindling)'),
    i('cat-gravelord', 'covenant', 'Gravelord Servant: entre no caixão nas Catacombs e espere 10–15 s; depois reze a Nito e aceite. Faça ANTES de matá-lo.', { warn: true }),
  ]},
  { id: 'tomb', area: 'Tomb of the Giants', items: [
    i('tomb-nito', 'boss', 'Derrote Gravelord Nito no fundo da tumba.'),
  ]},
  { id: 'newlondo', area: 'New Londo Ruins e Abismo', items: [
    i('nl-drain', 'key', 'Drene New Londo Ruins.'),
    i('nl-artorias', 'key', 'Equipe o Covenant of Artorias para atravessar o Abismo.'),
    i('nl-kings', 'boss', 'Derrote os Four Kings no Abismo.'),
    i('nl-darkwraith', 'covenant', 'Darkwraith: mate os Four Kings ainda com o Lordvessel no inventário (sem depositá-lo), fale com Kaathe e aceite.', { warn: true }),
  ]},
  { id: 'archives', area: "Duke's Archives e Crystal Cave", items: [
    i('arch-seath-tail', 'tail', 'Corte a cauda do dragão só depois de quebrar o cristal da imortalidade (impossível no primeiro encontro) e ANTES de matá-lo.', { warn: true }),
    i('arch-seath', 'boss', 'Derrote o dragão.', { full: 'Derrote Seath the Scaleless.' }),
  ]},
  { id: 'ashlake', area: 'Great Hollow e Ash Lake', items: [
    i('ash-dragon', 'covenant', 'Path of the Dragon: desça até o fim de Ash Lake e reze ao dragão imóvel. Não ataque o corpo dele.'),
  ]},
  { id: 'izalith', area: 'Demon Ruins e Lost Izalith', items: [
    i('iz-shortcut', 'key', 'Abra o atalho do caos (30 humanidades) ANTES da luta para salvar um aliado.', { warn: true, full: 'Abra o atalho do caos (30 humanidades) antes de Bed of Chaos para salvar Solaire.', verify: true }),
    i('iz-boss', 'boss', 'Destrua as duas raízes laterais e atinja o núcleo central.', { full: 'Derrote Bed of Chaos.' }),
  ]},
  { id: 'kiln', area: 'Kiln of the First Flame', items: [
    i('kiln-boss', 'boss', 'Derrote o chefe final.'),
    i('kiln-end', 'key', 'Escolha um final (NG): interagir com a fogueira central OU sair pelas portas. Os dois troféus exigem ciclos diferentes.', { warn: true, full: 'To Link the Flame: interaja com a fogueira. Dark Lord: saia pelas portas sem tocar nela. Obtenha ambos.' }),
  ]},
];

export const ROUTE_IDS = ROUTE.flatMap(a => a.items.map(x => x.id));
