// 41 troféus. IDs estáveis (chaves do save). Fonte: especificação do projeto; verify:true = não conferido contra o jogo.
// group: platina | historia | chefes | finais | pactos | colecao | aprimoramento
import { UPGRADES } from './upgrades.js';

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
  t('kindling', 'Rite of Kindling', 'historia', 'bronze', 'Derrote Pinwheel no fundo das Catacombs (permite usar humanidades para elevar o Estus).'),
  t('abyss', 'Art of Abysswalking', 'historia', 'bronze', 'Derrote o grande lobo em Darkroot Garden e recolha o anel que permite andar no Abismo.'),
  t('anorlondo', 'Reach Anor Londo', 'historia', 'bronze', "Derrote o Iron Golem no topo de Sen's Fortress e toque o círculo dourado."),
  t('lordvessel', 'Lordvessel', 'historia', 'prata', 'Derrote a dupla de cavaleiros no grande salão de Anor Londo e fale com a divindade no altar superior.'),

  t('priscilla', 'Defeat Crossbreed Priscilla', 'chefes', 'prata',
    'Entre em Painted World of Ariamis pelo quadro de Anor Londo e derrote a guardiã. Corte a cauda ANTES de matá-la.', { warn: true }),
  t('gwyndolin', 'Defeat Dark Sun Gwyndolin', 'chefes', 'prata',
    'Desça à cripta de Anor Londo com o Darkmoon Seance Ring e derrote o chefe. Faça o pacto da lua ANTES da luta.', { warn: true, verify: true }),
  t('seath', 'Defeat Seath the Scaleless', 'chefes', 'prata',
    'Derrote o dragão na arena de Crystal Cave. Corte a cauda ANTES, só depois de quebrar o cristal (impossível no primeiro encontro).', { warn: true }),
  t('fourkings', 'Defeat the Four Kings', 'chefes', 'prata',
    'Drene New Londo Ruins, equipe o Covenant of Artorias e vença os quatro reis no Abismo. Para o pacto Darkwraith, NÃO deposite o Lordvessel antes.', { warn: true }),
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
    'Pegue o Darkmoon Seance Ring nas Catacombs, equipe-o e ajoelhe-se na área da névoa abaixo da fogueira de Anor Londo (não atravesse).'),
  t('cov-sun', 'Covenant: Warrior of Sunlight', 'pactos', 'bronze',
    'Reze no altar quebrado. Exige 25 de Fé OU ter ajudado ao menos 4 jogadores com o white soapstone. (Local divergente entre fontes.)', { verify: true }),
  t('cov-hunter', 'Covenant: Forest Hunter', 'pactos', 'bronze',
    'Compre a Crest of Artorias de Andre (ou siga pela Darkroot Basin), abra a porta e responda "sim" às duas perguntas de Alvina.'),
  t('cov-chaos', 'Covenant: Chaos Servant', 'pactos', 'bronze',
    'Depois de Quelaag, desça a escada além do sino, quebre a parede ilusória, fale com Eingyi e escolha "Enter Covenant" com a mulher junto à fogueira.'),
  t('cov-gravelord', 'Covenant: Gravelord Servant', 'pactos', 'bronze',
    'Entre no caixão nas Catacombs e espere 10–15 s; reze a Nito e aceite. Faça ANTES de matá-lo.', { warn: true }),
  t('cov-dragon', 'Covenant: Path of the Dragon', 'pactos', 'bronze',
    'Desça por The Great Hollow até o fim de Ash Lake e reze ao dragão imóvel. Não ataque o corpo dele.'),
  t('cov-darkwraith', 'Covenant: Darkwraith', 'pactos', 'bronze',
    'CRÍTICO: não deposite o Lordvessel no altar de Firelink. Mate os Four Kings com ele no inventário, fale com Kaathe e aceite.', { warn: true }),

  t('knight', "Knight's Honor", 'colecao', 'prata',
    'Todas as armas raras (~50; o rastreador lista 49 conferidas): almas de chefe (exige 3 almas de Sif, ou seja NG++), caudas, pactos, tesouros e drops.', { link: ['#/armas', 'Abrir rastreador'] }),
  t('sage', 'Wisdom of a Sage', 'colecao', 'prata',
    'Todos os 24 feitiços: compre de Griggs, Dusk of Oolacile e Big Hat Logan, mais os itens achados no mundo.', { link: ['#/magias', 'Abrir rastreador'], verify: true }),
  t('pyro', 'Bond of a Pyromancer', 'colecao', 'prata',
    'Todas as 19 piromancias: Laurentius, Quelana, Eingyi e o rank 2 de Chaos Servant.', { link: ['#/magias', 'Abrir rastreador'], verify: true }),
  t('maiden', 'Prayer of a Maiden', 'colecao', 'prata',
    'Todos os 23 milagres: Petrus, Reah, Oswald, Siegmeyer e os pactos Sol, Lua Negra e Gravelord.', { link: ['#/magias', 'Abrir rastreador'], verify: true }),

  // Aprimoramentos: fonte única em upgrades.js (mesmos ids t-up-*)
  ...UPGRADES.map(u => ({ id: u.id, name: u.name, group: 'aprimoramento', tag: 'bronze', safe: `${u.meta}: ${u.safe}`, link: ['#/aprimoramentos', 'Ver matriz'] })),
];

export const PLAT_ID = 't-platinum';
export const TROPHY_IDS = TROPHIES.filter(x => !x.auto).map(x => x.id); // os 40 marcáveis
