// 3 builds pensadas para a platina. Valores são pontos de partida aproximados — ajuste ao seu estilo.
// verify: não conferido contra o jogo; confira requisitos exatos de armas/magias antes de investir pontos.
export const BUILDS = [
  {
    id: 'quality', name: 'Quality / Força', tag: 'Corpo a corpo',
    pitch: 'Dano físico estável e escala linear. Bom para almas de chefe (armas +10 base) e para a maior parte do jogo.',
    cls: 'Warrior ou Knight (começa com mais Força/Resistência).',
    stats: [
      ['Até SL 30', 'VIT 20 · END 20 · STR 24 · DEX 14 · RES 12'],
      ['Até SL 60', 'VIT 30 · END 25 · STR 30 · DEX 24 · FAITH/INT conforme necessidade de milagres'],
      ['Alvo (~SL 100–120)', 'VIT 40 · END 30 · STR 40 · DEX 40 (soft cap de dano em 40)'],
    ],
    gear: ['Havel\'s Ring (carga) ou Ring of Favor and Protection', 'Escudo de estabilidade alta (Black Iron Greatshield, no tesouro de Anor Londo)', 'Armadura que mantenha peso médio (≤ 25% de carga) para rolar rápido'],
    weapons: ['Início: Claymore ou Balder Side Sword', 'Transição: Greatsword → arma de Quality +5/+10', 'Alma de chefe para o Knight\'s Honor: Dragonslayer Spear, Smough\'s Hammer, etc. (ver Armas Raras)'],
    platinum: ['Uma arma padrão +15 cobre o troféu Strongest Weapon', 'Bom para NG+ e NG++ sem trocar de build', 'Faith/Int mínimos (18–20) só se quiser fazer as armas de Artorias'],
  },
  {
    id: 'pyro', name: 'Piromante Tanque', tag: 'Fogo / Defesa',
    pitch: 'Armadura pesada e escudo grande, com piromancias para dano à distância e área. Sobrevive bem e coleta as 19 piromancias.',
    cls: 'Pyromancer (já começa com Fire Orb/Pyromancy Flame).',
    stats: [
      ['Até SL 30', 'VIT 20 · END 18 · ATT 10 · STR 16'],
      ['Até SL 60', 'VIT 30 · END 25 · STR 24 · ATT 14 (mais slots de piromancia)'],
      ['Alvo (~SL 100)', 'VIT 40 · END 30 · STR 30 · RES 20–30 · Pyromancy Flame +10 via Laurentius'],
    ],
    gear: ['Havel\'s Set + Havel\'s Greatshield (tesouro em Anor Londo)', 'Ring of Steel Protection / Havel\'s Ring', 'Pyromancy Flame melhorada (+10 para treinar com Quelana)'],
    weapons: ['Mace/Morning Star para golpes rápidos entre piromancias', 'Fire Tempest e Great Combustion como principais', 'Chaos Storm no rank 2 de Chaos Servant (30 humanidades)'],
    platinum: ['Libera Bond of a Pyromancer: Laurentius, Quelana (flame +10), Eingyi e Chaos Servant', 'Atenção: compre tudo de Quelana antes de matar o chefe do caos', 'Piromancias aceleram o farm de almas (ver aba Farm)'],
  },
  {
    id: 'sorc', name: 'Sorcerer INT', tag: 'Magia',
    pitch: 'Dano mágico alto à distância e utilidade (Hidden Body, Cast Light). Frágil de início, muito forte com os cristais.',
    cls: 'Sorcerer (Soul Arrow + Catalyst).',
    stats: [
      ['Até SL 30', 'VIT 14 · ATT 12 · INT 30 (Soul Arrow/Heavy Soul Arrow)'],
      ['Até SL 60', 'VIT 24 · END 14 · ATT 14 · INT 40 (Crystal Soul Spear exige mais INT/ATT)'],
      ['Alvo (~SL 100)', 'VIT 30 · END 20 · ATT 20 · INT 50 · DEX 14 (evitar -DEX alto)'],
    ],
    gear: ['Catalisador: Sorcerer\'s Catalyst → Logan\'s Catalyst', 'Anéis: Ring of Fog, Ring of Sacrifice conforme o trecho', 'Armadura leve/média para rolar bem'],
    weapons: ['Soul Arrow → Great Soul Arrow → Crystal Soul Spear', 'Magic Weapon/Crystal Magic Weapon em arma corpo a corpo para ocasiões de fraqueza', 'Tin Darkmoon Catalyst (alma de Gwyndolin) para o Knight\'s Honor'],
    platinum: ['Compre os feitiços cedo: Griggs, Dusk e Logan têm janelas limitadas (aba Magias)', 'Bom para Wisdom of a Sage e Magic Weapon (+10)', 'Mais frágil em NG+ sem investir em VIT'],
  },
];
