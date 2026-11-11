# Todo — Platina Dark Souls Remastered

Revisão humana obrigatória em cada **Checkpoint** antes da próxima fase.

## Fase 1: Portão, fundação, persistência local, rota de mapas

- [x] **T1 — Casca + design system + portão de login funcional** (M)
  - Entrega: abrir `index.html` → tela de selo → login válido revela app vazio; inválido faz shake + "Humanidade Negada".
  - Critérios:
    - [ ] Tokens CSS (cores/fontes do prompt), bordas duplas, glow de fogueira, `prefers-reduced-motion` respeitado
    - [ ] Usuário + 4 slots de PIN (teclado físico e virtual), foco e labels acessíveis
    - [ ] Validação por SHA-256(salt+user+pin); sem PIN em texto puro no código
    - [ ] "Permanecer Conectado" → `localStorage`, senão `sessionStorage`
    - [ ] Animação de sucesso (névoa dissipa); erro (shake + borda vermelha)
  - Verificação: `node --test` em `auth.js` (hash certo/errado); manual: 3 cenários (ok, erro, sessão persiste após reload)
  - Dep.: nenhuma · Arquivos: `index.html`, `styles.css`, `js/auth.js`, `js/app.js`, `tests/auth.test.js`

- [x] **T2 — Motor de estado + auto-save versionado + indicador de fogueira** (M)
  - Entrega: marcar qualquer coisa → salvo com debounce → indicador "Progresso salvo na fogueira".
  - Critérios:
    - [ ] `store.get/set/subscribe`, debounce ~400 ms, chave `dsr_platinum_v1`, `schemaVersion` + `migrate()`
    - [ ] Dados corrompidos/versão antiga → backup da chave antiga, não crasha
    - [ ] `localStorage` indisponível → banner de aviso, app segue em memória
    - [ ] Indicador: estados "salvando…" / "salvo às HH:MM"
  - Verificação: `node --test` (migrate, dado corrompido, debounce); manual: marcar item, recarregar, persiste
  - Dep.: T1 · Arquivos: `js/store.js`, `js/ui.js`, `tests/store.test.js`

- [x] **T3 — Cabeçalho, navegação e anti-spoiler** (S–M)
  - Entrega: header com progresso geral, Logout ("Apagar Fogueira"), toggle Sem Spoilers, nav por hash com 7 seções (placeholders exceto Rota).
  - Critérios:
    - [ ] Rotas `#/rota` `#/conquistas` `#/armas` `#/magias` `#/aprimoramentos` `#/builds` `#/dados`; rota inválida → `#/rota`
    - [ ] Toggle persiste no estado; muda texto `safe`/`full` sem recarregar
    - [ ] Logout limpa sessão e volta ao portão (progresso permanece)
    - [ ] Barra de progresso geral reage ao store
    - [ ] Responsivo (mobile ≥ 360 px), nav acessível por teclado
  - Verificação: manual (navegação, toggle, logout, reload); teste da função de % de progresso
  - Dep.: T2 · Arquivos: `index.html`, `styles.css`, `js/router.js`, `js/app.js`

- [x] **T4 — Rota Otimizada de Mapas (cards + checklist)** (M)
  - Entrega: cards cronológicos por área com checklist de chefes, caudas e itens-chave; marcar atualiza progresso e salva.
  - Critérios:
    - [ ] `js/data/route.js` com schema `{ id, area, items:[{id, type, safe, full?, warn?}] }`; `safe` obrigatório
    - [ ] Itens com aviso de ponto sem retorno usam destaque Ember
    - [ ] Cartão mostra contagem `x/y` e colapsa/expande
    - [ ] Anti-spoiler troca para `safe` sem nomes de revelações
    - [ ] IDs estáveis (nunca reutilizar) — documentado no arquivo
  - Verificação: teste que todo item tem `id` único e `safe`; manual: marcar, recarregar, % do header sobe
  - Dep.: T3 · Arquivos: `js/data/route.js`, `js/views/route.js`, `styles.css`, `tests/data.test.js`

- [x] **T5 — Documento de decisão de persistência** (XS)
  - Entrega: `docs/persistencia.md` com a análise comparativa (resumo do plano) para colar na resposta da Fase 1.
  - Critério: cobre localStorage/IndexedDB/Gist/JSONBin/URL hash + recomendação + ressalva de segurança do PAT
  - Dep.: nenhuma (pode ir em paralelo)

### Checkpoint 1 — Fundação
- [ ] `node --test` passa
- [ ] Fluxo ponta a ponta no navegador: login → marcar itens → reload → progresso mantido → logout/login
- [ ] Sem erros no console; mobile ok; contraste legível
- [ ] **Humano revisa** visual, rota de mapas e análise de persistência → aprova Fase 2

## Fase 2: Matriz das 41 conquistas
- [x] **T6** — Dados `trophies.js` (41, 7 categorias, `safe`/`full`, `// VERIFY` em dúvidas) + teste de contagem = 41 e por categoria (1/9/6/2/9/4/10)
- [x] **T7** — View: tabela filtrável (categoria, tipo, status) + busca + checkbox; % da platina no header (platina auto = 40/40)
- [x] Checkpoint 2: contagens batem, filtros combinam, % correto, reload mantém

## Fase 3: Armas raras (Knight's Honor — 50)
- [x] **T8** — Dados `weapons.js` (50: 15 almas, 6 caudas, 2 pactos, 12 tesouros, 15 drops) + teste de contagens
- [x] **T9** — View: checklist, filtros por tipo, busca em tempo real, requisitos de forja (+10)
- [x] **T10** — Alocação de almas de Sif por ciclo NG/NG+/NG++ (estado + regra de 3 almas no NG++)
- [x] Checkpoint 3: 50 itens, alocação coerente; decidir auto-sugestão do troféu Knight's Honor

## Fase 4: Magias e aprimoramentos
- [x] **T11** — Dados + view com 3 abas (24 feitiços / 19 piromancias / 23 milagres), mercador, alerta de perda definitiva
- [x] **T12** — Matriz das 10 infusões máximas (brasa, ferreiro, slab) com checklist
- [x] Checkpoint 4: contagens 24/19/23/10 conferem; alertas visíveis

## Fase 5: Builds, nuvem, backup, deploy
- [x] **T13** — Export/Import JSON (valida schema, confirma antes de sobrescrever) + reset em 2 etapas
- [x] **T14** — Sync Gist: PAT, criar/atualizar Gist privado, Push/Pull, data do último sync, resolução de conflito por `updatedAt`
- [x] **T15** — 3 guias de build (Quality/Força, Piromante Tanque, Sorcerer INT)
- [x] **T16** — `README.md`: deploy no Pages, token fine-grained, ressalvas de segurança
- [x] Checkpoint final (deploy no Pages pendente: ativar em Settings): ciclo completo export→reset→import; push→limpar storage→pull; deploy no Pages testado
