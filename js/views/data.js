import { blank, KEY } from '../store.js';
import { loadCfg, saveCfg, findGist, readRemote, pushRemote } from '../sync.js';
import { esc } from '../util.js';

const fmt = t => (t ? new Date(t).toLocaleString('pt-BR') : 'nunca');

export function renderData(el, store) {
  const cfg = loadCfg();
  el.innerHTML = `
    <h2>Dados &amp; Nuvem</h2>
    <p class="lead">Três camadas: auto-save neste navegador (sempre ativo), nuvem (GitHub Gist) e arquivo JSON.</p>
    <p id="dmsg" class="banner" role="status" hidden></p>

    <section class="panel dsec"><h3>☁️ Nuvem — GitHub Gist privado</h3>
      <p class="note">Crie um token <b>fine-grained</b> em GitHub → Settings → Developer settings, com permissão <b>Gists: read and write</b> e nada mais. O token fica só neste navegador e nunca vai para o arquivo exportado.</p>
      <label class="field">Token do GitHub
        <input id="tok" type="password" autocomplete="off" spellcheck="false" value="${esc(cfg.token || '')}" placeholder="github_pat_…">
      </label>
      <label class="field">ID do Gist (opcional — preenchido sozinho)
        <input id="gid" type="text" spellcheck="false" value="${esc(cfg.gistId || '')}">
      </label>
      <div class="btnrow">
        <button class="btn primary" id="push">⬆ Salvar na Nuvem</button>
        <button class="btn" id="pull">⬇ Carregar da Nuvem</button>
      </div>
      <p class="note" id="last">Último sync: ${esc(fmt(cfg.lastSync))}</p>
    </section>

    <section class="panel dsec"><h3>💾 Backup em arquivo</h3>
      <div class="btnrow">
        <button class="btn" id="exp">Baixar JSON</button>
        <label class="btn">Importar JSON<input type="file" id="imp" accept="application/json,.json" hidden></label>
      </div>
    </section>

    <section class="panel dsec danger"><h3>⚠ Zona de perigo</h3>
      <p class="note">Apaga todo o progresso deste navegador. Uma cópia de segurança é guardada antes (chave <code>${KEY}_prereset</code>).</p>
      <button class="btn" id="reset">Reiniciar progresso…</button>
    </section>

    <dialog id="rdlg" class="panel confirm"><h3>Reiniciar progresso?</h3>
      <p id="rstep">Passo 1 de 2: isso apaga todas as marcações.</p>
      <input id="rtype" placeholder="Digite REINICIAR" hidden autocomplete="off">
      <div class="btnrow"><button class="btn" id="rcancel">Cancelar</button><button class="btn primary" id="rnext">Continuar</button></div>
    </dialog>`;

  const $ = s => el.querySelector(s);
  const say = (t, bad) => { const m = $('#dmsg'); m.hidden = !t; m.textContent = t || ''; m.classList.toggle('ok', !bad); };
  const busy = async (fn) => {
    el.querySelectorAll('button').forEach(b => (b.disabled = true));
    try { await fn(); } catch (e) { say('Falhou: ' + e.message, true); } finally { el.querySelectorAll('button').forEach(b => (b.disabled = false)); }
  };
  const cfgNow = () => ({ ...loadCfg(), token: $('#tok').value.trim(), gistId: $('#gid').value.trim() });
  const stamp = c => { saveCfg(c); $('#last').textContent = 'Último sync: ' + fmt(c.lastSync); $('#gid').value = c.gistId || ''; };

  $('#push').onclick = () => busy(async () => {
    let c = cfgNow();
    if (!c.token) return say('Informe o token.', true);
    store.flush();
    if (!c.gistId) c.gistId = (await findGist(c.token)) || '';
    if (c.gistId) {
      const remote = await readRemote(c.token, c.gistId);
      if (remote.updatedAt > (c.lastRemoteAt || 0) &&
          !confirm(`A nuvem foi alterada em ${fmt(remote.updatedAt)}, depois do seu último sync. Sobrescrever a nuvem com este navegador?`)) return say('Envio cancelado.', true);
    }
    const local = store.get();
    c.gistId = await pushRemote(c.token, c.gistId, local);
    c = { ...c, lastRemoteAt: local.updatedAt, lastSync: Date.now() };
    stamp(c); say('Progresso salvo na nuvem.');
  });

  $('#pull').onclick = () => busy(async () => {
    let c = cfgNow();
    if (!c.token) return say('Informe o token.', true);
    if (!c.gistId) c.gistId = (await findGist(c.token)) || '';
    if (!c.gistId) return say('Nenhum Gist de progresso encontrado. Use "Salvar na Nuvem" primeiro.', true);
    const remote = await readRemote(c.token, c.gistId);
    store.flush();
    if (store.get().updatedAt > (c.lastRemoteAt || 0) &&
        !confirm('Há alterações locais ainda não enviadas. Substituir pelo conteúdo da nuvem?')) return say('Carregamento cancelado.', true);
    store.replace(remote, { keep: true });
    c = { ...c, lastRemoteAt: remote.updatedAt, lastSync: Date.now() };
    stamp(c); say('Progresso carregado da nuvem.');
  });

  $('#exp').onclick = () => {
    store.flush();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(store.get(), null, 1)], { type: 'application/json' }));
    a.download = `dsr-platina-${new Date().toISOString().slice(0, 10)}.json`;
    a.click(); URL.revokeObjectURL(a.href);
    say('Backup baixado.');
  };

  $('#imp').onchange = async e => {
    const file = e.target.files[0]; e.target.value = '';
    if (!file) return;
    try {
      const incoming = JSON.parse(await file.text());
      store.replace(incoming, { keep: true }); // migrate valida; erro cai no catch sem alterar nada
      say('Backup importado.');
    } catch (err) { say('Arquivo inválido: ' + err.message, true); }
  };

  // Reset em duas etapas
  const dlg = $('#rdlg'); let step = 1;
  const resetDlg = () => { step = 1; $('#rstep').textContent = 'Passo 1 de 2: isso apaga todas as marcações.'; $('#rtype').hidden = true; $('#rtype').value = ''; $('#rnext').textContent = 'Continuar'; };
  $('#reset').onclick = () => { resetDlg(); dlg.showModal(); };
  $('#rcancel').onclick = () => dlg.close();
  $('#rnext').onclick = () => {
    if (step === 1) {
      step = 2; $('#rstep').textContent = 'Passo 2 de 2: digite REINICIAR para confirmar.';
      $('#rtype').hidden = false; $('#rtype').focus(); $('#rnext').textContent = 'Apagar tudo';
      return;
    }
    if ($('#rtype').value.trim() !== 'REINICIAR') return;
    store.flush();
    try { localStorage.setItem(KEY + '_prereset', JSON.stringify(store.get())); } catch { /* sem espaço */ }
    store.replace(blank());
    dlg.close(); say('Progresso reiniciado.');
  };
}
