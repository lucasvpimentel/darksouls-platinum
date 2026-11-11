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
    i('fl-serpent', 'npc', 'NÃO aceite o convite da serpente de Firelink antes de vencer os Four Kings.', { warn: true }),
  ]},
  { id: 'burg', area: 'Undead Burg e Undead Parish', items: [
    i('burg-taurus', 'boss', 'Derrote o Taurus Demon na ponte.'),
    i('burg-capra', 'boss', 'Derrote o Capra Demon no Lower Undead Burg.'),
    i('parish-tail', 'tail', 'Bell Gargoyles: corte a cauda de um gárgula antes de matá-lo.', { warn: true }),
    i('parish-bell1', 'boss', 'Derrote os Bell Gargoyles no telhado e toque o primeiro sino. (Troféu Ring the Bell)'),
    i('parish-sunlight', 'covenant', 'Warrior of Sunlight: interaja com a estátua na sacada (25 de Fé, −5 por chefe vencido em co-op).', { verify: true }),
  ]},
  { id: 'darkroot', area: 'Darkroot Garden', items: [
    i('dr-hunter', 'covenant', 'Forest Hunter: abra a porta com a Crest of Artorias e fale com Alvina na janela da ruína.', { verify: true }),
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
    i('q-chaos', 'covenant', 'Chaos Servant: quebre a parede ilusória no andar inferior, fale com Eingyi e jure fidelidade.', { verify: true }),
  ]},
  { id: 'sens', area: "Sen's Fortress", items: [
    i('sens-golem', 'boss', 'Derrote o Iron Golem e toque o círculo dourado. (Troféu Reach Anor Londo)'),
  ]},
  { id: 'anor', area: 'Anor Londo', items: [
    i('anor-os', 'boss', 'Derrote a dupla de cavaleiros no grande salão e fale com a divindade no altar superior. (Troféu Lordvessel)'),
    i('anor-pg', 'covenant', "Princess's Guard: ajoelhe-se e faça o juramento após receber o Lordvessel."),
    i('anor-darkmoon', 'covenant', 'Blade of the Darkmoon: equipe o Darkmoon Seance Ring no subsolo e ajoelhe-se diante do tapete (não atravesse a névoa).', { verify: true }),
    i('anor-gwyn', 'boss', 'Derrote o chefe da cripta. Faça o pacto da lua ANTES da luta.', { warn: true, verify: true }),
  ]},
  { id: 'painted', area: 'Painted World of Ariamis', items: [
    i('pw-tail', 'tail', 'Corte a cauda da guardiã ANTES de matá-la.', { warn: true }),
    i('pw-boss', 'boss', 'Derrote a guardiã.', { full: 'Derrote Crossbreed Priscilla.' }),
  ]},
  { id: 'catacombs', area: 'Catacombs', items: [
    i('cat-pinwheel', 'boss', 'Derrote Pinwheel. (Troféu Rite of Kindling)', { verify: true }),
    i('cat-gravelord', 'covenant', 'Gravelord Servant: entre no caixão aberto perto do Titanite Demon com um Eye of Death. ANTES de enfrentar Nito.', { warn: true, verify: true }),
  ]},
  { id: 'tomb', area: 'Tomb of the Giants', items: [
    i('tomb-nito', 'boss', 'Derrote Gravelord Nito no fundo da tumba.'),
  ]},
  { id: 'newlondo', area: 'New Londo Ruins e Abismo', items: [
    i('nl-drain', 'key', 'Drene New Londo Ruins.'),
    i('nl-artorias', 'key', 'Equipe o Covenant of Artorias para atravessar o Abismo.'),
    i('nl-kings', 'boss', 'Derrote os Four Kings no Abismo.', { verify: true }),
    i('nl-darkwraith', 'covenant', 'Darkwraith: só possível se NÃO falou com a serpente de Firelink antes dos Four Kings.', { warn: true, verify: true }),
  ]},
  { id: 'archives', area: "Duke's Archives e Crystal Cave", items: [
    i('arch-seath-tail', 'tail', 'Quebre o cristal na arena e corte a ponta da cauda do dragão ANTES de matá-lo.', { warn: true, verify: true }),
    i('arch-seath', 'boss', 'Derrote o dragão.', { full: 'Derrote Seath the Scaleless.' }),
  ]},
  { id: 'ashlake', area: 'Great Hollow e Ash Lake', items: [
    i('ash-dragon', 'covenant', 'Path of the Dragon: desça até o fim da praia e jure lealdade ao dragão imóvel.', { verify: true }),
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
