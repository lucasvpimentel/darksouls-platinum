import { renderList } from './list.js';
import { FARM, GROUPS } from '../data/farm.js';

const head = `
  <div class="panel sif">
    <h3>Item Discovery</h3>
    <ul class="plain">
      <li>Base 100. Com 10 humanidades no contador: +110 (210).</li>
      <li>Covetous Gold Serpent Ring (+200) e Symbol of Avarice (+200, drena 5 HP/s) <b>não acumulam</b>: teto de 410.</li>
      <li>Covetous Silver Serpent Ring (+20% almas) soma com o Symbol of Avarice (+20%), totalizando ≈ +44%.</li>
    </ul>
    <p class="note">⚠ Tudo nesta aba vem do briefing do projeto e <b>não foi conferido contra o jogo</b> (valores, localizações e taxas). Itens com “conflito” discordam de guias conferidos.</p>
  </div>`;

export const renderFarm = (el, store) => renderList(el, store, {
  key: 'farm',
  title: 'Farm Spots e Otimização de Drops',
  lead: 'Marque o que já farmou. Use Homeward Bone para reiniciar o ciclo em cada fogueira.',
  items: FARM.map(x => x.conflito ? { ...x, meta: `${x.meta} · conflito: ${x.conflito}`, warn: true } : x),
  groups: GROUPS, tags: GROUPS, head,
});
