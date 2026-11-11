import { BUILDS } from '../data/builds.js';
import { esc } from '../util.js';

const list = a => `<ul>${a.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;

export function renderBuilds(el) {
  el.innerHTML = `
    <h2>Central de Builds</h2>
    <p class="lead">Três caminhos para a platina. <span class="vf">verificar</span> Valores de atributos são pontos de partida aproximados, não conferidos contra o jogo.</p>
    ${BUILDS.map(b => `
      <details class="area panel build" id="b-${b.id}">
        <summary><span class="num">⚔</span>${esc(b.name)}<span class="cnt">${esc(b.tag)}</span></summary>
        <div class="bbody">
          <p>${esc(b.pitch)}</p>
          <h4>Classe inicial</h4><p>${esc(b.cls)}</p>
          <h4>Atributos</h4>
          <table class="matrix"><tbody>${b.stats.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table>
          <h4>Equipamento</h4>${list(b.gear)}
          <h4>Armas e magias</h4>${list(b.weapons)}
          <h4>Para a platina</h4>${list(b.platinum)}
        </div>
      </details>`).join('')}`;
}
