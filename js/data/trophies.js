// 41 troféus. IDs estáveis (chaves do save). Fonte: especificação do projeto; verify:true = não conferido contra o jogo.
// group: platina | historia | chefes | finais | pactos | colecao | aprimoramento
export const GROUPS = {
  platina: 'Platina', historia: 'História e área', chefes: 'Grandes almas e chefes',
  finais: 'Finais', pactos: 'Pactos', colecao: 'Colecionáveis', aprimoramento: 'Aprimoramento de armas',
};
export const TYPES = { platina: 'Platina', ouro: 'Ouro', prata: 'Prata', bronze: 'Bronze' };

const t = (id, name, group, tag, safe, o = {}) => ({ id: 't-' + id, name, group, tag, safe, ...o });

export const TROPHIES = [
  t('platinum', 'The Dark Soul', 'platina', 'platina',
    'Desbloqueia sozinho ao concluir os outros 40. Exige no mínimo NG, NG+ e início de NG++.', { auto: true }),

  t('enkindle', 'Enkindle', 'historia', 'bronze', 'Acenda a primeira fogueira no pátio do Northern Undead Asylum.'),
  t('estus', 'Estus Flask', 'historia', 'bronze', 'Fale com o cavaleiro ferido no andar superior do Asylum e receba o frasco.'),
  t('lordran', 'Reach Lordran', 'historia', 'bronze', 'Derrote o chefe do tutorial e pegue a carona do corvo até Firelink Shrine.'),
  t('bell1', 'Ring the Bell (Undead Church)', 'historia', 'bronze', 'Derrote os Bell Gargoyles no telhado de Undead Parish e toque o primeiro sino.'),
  t('bell2', "Ring the Bell (Quelaag's Domain)", 'historia', 'bronze', 'Derrote a criatura do domínio de Quelaag, após Blighttown, e toque o segundo sino.'),
  t('kindling', 'Rite of Kindling', 'historia', 'bronze', 'Derrote Pinwheel no fundo das Catacombs (permite usar humanidades para elevar o Estus).', { verify: true }),
  t('abyss', 'Art of Abysswalking', 'historia', 'bronze', 'Derrote o grande lobo em Darkroot Garden e recolha o anel que permite andar no Abismo.'),
  t('anorlondo', 'Reach Anor Londo', 'historia', 'bronze', "Derrote o Iron Golem no topo de Sen's Fortress e toque o círculo dourado."),
  t('lordvessel', 'Lordvessel', 'historia', 'prata', 'Derrote a dupla de cavaleiros no grande salão de Anor Londo e fale com a divindade no altar superior.'),

  t('priscilla', 'Defeat Crossbreed Priscilla', 'chefes', 'prata',
    'Entre em Painted World of Ariamis pelo quadro de Anor Londo e derrote a guardiã. Corte a cauda ANTES de matá-la.', { warn: true }),
  t('gwyndolin', 'Defeat Dark Sun Gwyndolin', 'chefes', 'prata',
    'Desça à cripta de Anor Londo com o Darkmoon Seance Ring e derrote o chefe. Faça o pacto da lua ANTES da luta.', { warn: true, verify: true }),
  t('seath', 'Defeat Seath the Scaleless', 'chefes', 'prata',
    'Quebre o cristal na arena de Crystal Cave e derrote o dragão. Corte a ponta da cauda ANTES de matá-lo.', { warn: true, verify: true }),
  t('fourkings', 'Defeat the Four Kings', 'chefes', 'prata',
    'Drene New Londo Ruins, equipe o Covenant of Artorias e vença os quatro reis no Abismo. NÃO fale com a serpente de Firelink antes.', { warn: true, verify: true }),
  t('bedofchaos', 'Defeat Bed of Chaos', 'chefes', 'prata',
    'Destrua as duas raízes laterais e atinja o núcleo central em Lost Izalith. Abra o atalho do caos (30 humanidades) ANTES, para salvar um aliado.',
    { warn: true, verify: true }),
  t('nito', 'Defeat Gravelord Nito', 'chefes', 'prata',
    'Derrote Nito no fundo de Tomb of the Giants. Entre no pacto Gravelord Servant ANTES desta luta.', { warn: true }),

  t('linkflame', 'To Link the Flame', 'finais', 'ouro',
    'Derrote o chefe final em Kiln of the First Flame e interaja com a fogueira central.', { nameSafe: 'Final A (acender)' }),
  t('darklord', 'Dark Lord', 'finais', 'ouro',
    'Derrote o chefe final e saia da arena pelas portas, sem tocar na fogueira.', { nameSafe: 'Final B (sair)' }),

  t('cov-white', 'Covenant: Way of White', 'pactos', 'bronze', 'Fale com Petrus em Firelink Shrine, logo no início, e aceite o juramento.'),
  t('cov-guard', "Covenant: Princess's Guard", 'pactos', 'bronze', 'Ajoelhe-se e faça o juramento com a divindade em Anor Londo, depois de receber o Lordvessel.'),
  t('cov-darkmoon', 'Covenant: Blade of the Darkmoon', 'pactos', 'bronze',
    'Equipe o Darkmoon Seance Ring no subsolo de Anor Londo e ajoelhe-se diante do tapete (não atravesse a névoa).', { verify: true }),
  t('cov-sun', 'Covenant: Warrior of Sunlight', 'pactos', 'bronze',
    'Interaja com a estátua quebrada na sacada de Undead Parish (25 de Fé, −5 por chefe vencido em co-op).', { verify: true }),
  t('cov-hunter', 'Covenant: Forest Hunter', 'pactos', 'bronze',
    'Abra a porta da floresta em Darkroot Garden com a Crest of Artorias e fale com Alvina na janela da ruína.', { verify: true }),
  t('cov-chaos', 'Covenant: Chaos Servant', 'pactos', 'bronze',
    'Quebre a parede ilusória no andar inferior do sino de Quelaag, fale com Eingyi e jure fidelidade.', { verify: true }),
  t('cov-gravelord', 'Covenant: Gravelord Servant', 'pactos', 'bronze',
    'Entre no caixão aberto perto do Titanite Demon nas Catacombs com um Eye of Death no inventário. ANTES de matar Nito.', { warn: true, verify: true }),
  t('cov-dragon', 'Covenant: Path of the Dragon', 'pactos', 'bronze',
    'Desça por The Great Hollow até o fim da praia de Ash Lake e jure lealdade ao dragão imóvel.', { verify: true }),
  t('cov-darkwraith', 'Covenant: Darkwraith', 'pactos', 'bronze',
    'CRÍTICO: não fale com a serpente de Firelink. Mate os Four Kings primeiro, encontre a serpente no Abismo e entre no pacto.', { warn: true, verify: true }),

  t('knight', "Knight's Honor", 'colecao', 'prata',
    'Todas as armas raras (~50; o rastreador lista 49 conferidas): almas de chefe (exige 3 almas de Sif, ou seja NG++), caudas, pactos, tesouros e drops.', { link: ['#/armas', 'Abrir rastreador'] }),
  t('sage', 'Wisdom of a Sage', 'colecao', 'prata',
    'Todos os 24 feitiços: compre de Griggs, Dusk of Oolacile e Big Hat Logan, mais os itens achados no mundo.', { link: ['#/magias', 'Abrir rastreador'], verify: true }),
  t('pyro', 'Bond of a Pyromancer', 'colecao', 'prata',
    'Todas as 19 piromancias: Laurentius, Quelana, Eingyi e o rank 2 de Chaos Servant.', { link: ['#/magias', 'Abrir rastreador'], verify: true }),
  t('maiden', 'Prayer of a Maiden', 'colecao', 'prata',
    'Todos os 23 milagres: Petrus, Reah, Oswald, Siegmeyer e os pactos Sol, Lua Negra e Gravelord.', { link: ['#/magias', 'Abrir rastreador'], verify: true }),

  t('up-strong', 'Strongest Weapon', 'aprimoramento', 'bronze', 'Linha padrão +15: Large Ember (Depths) e Very Large Ember (New Londo Ruins) com Andre; Titanite Slab.', { link: ['#/aprimoramentos', 'Ver matriz'], verify: true }),
  t('up-crystal', 'Crystal Weapon', 'aprimoramento', 'bronze', 'Cristal +5: Crystal Ember (Duke\'s Archives) com Andre; Titanite Slab.', { link: ['#/aprimoramentos', 'Ver matriz'], verify: true }),
  t('up-lightning', 'Lightning Weapon', 'aprimoramento', 'bronze', 'Raio +5: arma padrão +10 evoluída com o Ferreiro Gigante de Anor Londo; Titanite Slab.', { link: ['#/aprimoramentos', 'Ver matriz'], verify: true }),
  t('up-raw', 'Raw Weapon', 'aprimoramento', 'bronze', 'Bruta +5: Large Ember (Depths) com Andre; Titanite Chunks (sem slab).', { link: ['#/aprimoramentos', 'Ver matriz'], verify: true }),
  t('up-magic', 'Magic Weapon', 'aprimoramento', 'bronze', "Mágica +10: Large Magic Ember (Duke's Archives) com Rickert de Vinheim; Blue Titanite Slab.", { link: ['#/aprimoramentos', 'Ver matriz'], verify: true }),
  t('up-enchanted', 'Enchanted Weapon', 'aprimoramento', 'bronze', 'Encantada +5: Enchanted Ember (Darkroot Garden) com Rickert de Vinheim; Blue Titanite Slab.', { link: ['#/aprimoramentos', 'Ver matriz'], verify: true }),
  t('up-divine', 'Divine Weapon', 'aprimoramento', 'bronze', 'Divina +10: Divine Ember (Darkroot) e Large Divine Ember (Tomb of the Giants) com Andre; White Titanite Slab.', { link: ['#/aprimoramentos', 'Ver matriz'], verify: true }),
  t('up-occult', 'Occult Weapon', 'aprimoramento', 'bronze', 'Oculta +5: Dark Ember (Painted World of Ariamis) com Andre; White Titanite Slab.', { link: ['#/aprimoramentos', 'Ver matriz'], verify: true }),
  t('up-fire', 'Fire Weapon', 'aprimoramento', 'bronze', 'Fogo +10: Large Flame Ember (Demon Ruins) com o ferreiro Vamos nas Catacombs; Red Titanite Slab.', { link: ['#/aprimoramentos', 'Ver matriz'], verify: true }),
  t('up-chaos', 'Chaos Weapon', 'aprimoramento', 'bronze', 'Caos +5: Chaos Flame Ember (Demon Ruins) com Vamos; Red Titanite Slab.', { link: ['#/aprimoramentos', 'Ver matriz'], verify: true }),
];

export const PLAT_ID = 't-platinum';
export const TROPHY_IDS = TROPHIES.filter(x => !x.auto).map(x => x.id); // os 40 marcáveis
