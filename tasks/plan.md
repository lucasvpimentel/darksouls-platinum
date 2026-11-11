# Plano de Implementação: Guia & Checklist de Platina — Dark Souls Remastered

## Visão geral
SPA estática (HTML + CSS + JS vanilla com ES modules), sem build, hospedada no GitHub Pages. Checklist de 41 troféus, rastreadores de armas/magias/aprimoramentos, rota de mapas, builds. Acesso por "portão" de usuário único, progresso salvo localmente (auto-save) + nuvem (Gist) + arquivo JSON. Entrega **estritamente iterativa**: 5 fases, cada uma termina em checkpoint com revisão humana antes de avançar.

Repositório atual: vazio (greenfield). Nenhum plano anterior existente.

## Decisões de arquitetura

| Decisão | Escolha | Motivo |
|---|---|---|
| Módulos | ES modules nativos (`<script type="module">`) | Zero build; funciona no Pages e em `localhost`. **Não** abre via `file://` → usar `python -m http.server` p/ dev |
| Layout de arquivos | `index.html`, `styles.css`, `js/{app,auth,store,router,ui}.js`, `js/data/*.js` | Dados separados da lógica: fases 2–4 só adicionam arquivo de dados + view |
| Estado | 1 objeto JSON versionado, `store.get/set/subscribe` | Uma fonte de verdade; auto-save, progresso e sync reagem ao mesmo evento |
| Roteamento | `location.hash` (`#/rota`, `#/conquistas`…) | Sem servidor, funciona no Pages |
| Render | Template strings + delegação de eventos | Sem framework; dados são estáticos |
| Fontes | Google Fonts (Cinzel, Inter) com fallback serif/sans do sistema | Única dependência externa; app funciona sem ela |
| Testes | `node --test` só para módulos puros (`store` migrate, `auth` hash, cálculo de progresso) | Sem build, sem framework. UI verificada no navegador |

### Persistência (análise a ser apresentada na resposta da Fase 1)

| Opção | Prós | Contras | Veredito |
|---|---|---|---|
| `localStorage` | Síncrono, simples; save ≈ poucos KB | Por navegador/aparelho; some se limpar dados | **Camada 1** |
| `IndexedDB` | Maior capacidade, assíncrono | Complexidade sem ganho p/ JSON pequeno | Descartado (YAGNI) |
| **GitHub Gist API** (PAT escopo `gist`) | Dados do próprio usuário, privados, histórico de revisões grátis, CORS liberado, sem terceiros | Exige colar PAT 1x por aparelho; PAT fica no navegador | **Camada 2 (recomendada)** |
| JSONBin / Supabase anon | Sync key curta | Terceiro, limites/quotas, chave curta é adivinhável, risco de serviço sumir | Descartado |
| URL hash (comprimido) | Zero infra, portátil | Limite de tamanho de URL, sem histórico, sync manual. Compressão nativa `CompressionStream` dispensa LZ-string | Extra opcional (Fase 5) |
| Export/Import JSON | Contingência total | Manual | **Camada 3** |

Conflito de sync: comparar `updatedAt` local × remoto; Push/Pull sempre pede confirmação se o outro lado for mais novo (sem merge automático).

### Segurança do portão — ressalva honesta
Login em site estático é **cosmético**: usuário/PIN ficam no JS público. Mitigação: guardar só SHA-256(salt+user+pin) via `crypto.subtle`, nunca texto puro; PIN de 4 dígitos continua força-bruta trivial (10⁴ combinações). Na prática o progresso já é isolado por navegador (`localStorage` de visitante ≠ o seu), então o portão serve de UX/privacidade leve, não proteção real. O PAT do Gist é o único segredo real: orientar token **fine-grained, só gist**, e nunca incluí-lo no export JSON.

### Grafo de dependências
```
tokens/CSS ─┐
store.js ───┼─► shell (header, nav, router) ─► Rota de Mapas (Fase 1)
auth.js ────┘            │
                         ├─► Conquistas (F2) ─► % platina no header
                         ├─► Armas raras (F3) ─┐ (Knight's Honor = troféu F2)
                         ├─► Magias/Aprimoramentos (F4) ─┘ (alimentam troféus F2)
                         └─► Sync/Backup/Builds/README (F5)
```
Troféus de coleção (Knight's Honor, Wisdom…) e de aprimoramento são derivados das fases 3/4; na F2 são marcados manualmente, e nas F3/F4 passam a poder ser auto-sugeridos (decidir no checkpoint F3).

## Fatias verticais — Fase 1 (detalhe completo)
Fases 2–5 estão em nível de tarefa; serão detalhadas (critérios/arquivos) ao entrar em cada uma, após revisão do checkpoint anterior.

Ver `tasks/todo.md` para tarefas, critérios e verificações.

## Riscos e mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| Dados do prompt (troféus, requisitos, contagens 50 armas/24/19/23) com imprecisões ou inconsistências em relação ao jogo | Alto | Tratar o prompt como fonte; marcar itens duvidosos em `// VERIFY` nos arquivos de dados; revisar contra wiki/guia de troféus antes de F2/F3. Soma das categorias do prompt = 1+9+6+2+9+4+10 = **41** ✔ |
| Anti-spoiler exige 2 versões de texto por item | Médio | Schema de dado `{ safe, full }` desde a Fase 1 (rota); `safe` obrigatório, `full` opcional |
| Falso senso de segurança do login | Médio | Documentar no README e no plano (acima) |
| PAT vazado (XSS, export) | Alto | Sem scripts de terceiros; PAT fora do export; fine-grained token |
| Perda de save por mudança de schema | Alto | `schemaVersion` + cadeia de `migrate()` testada; backup automático da versão antiga antes de migrar |
| `file://` não carrega módulos | Baixo | README: servir com servidor local |
| Fontes do Google bloqueadas/offline | Baixo | Stack de fallback |
| Cota/limite de `localStorage` ou modo privado | Baixo | try/catch, banner "Salvamento local indisponível" |

## Perguntas em aberto (assumidas por padrão, corrija se discordar)
1. **Idioma da UI:** português (BR); nomes de chefes/áreas/troféus mantidos em inglês como no jogo.
2. **Plataforma:** troféus PlayStation (Platina). Equivalente Steam/Xbox não tratado.
3. **Perfis:** um único perfil (`lucasvpimente`); chave de storage `dsr_platinum_v1`.
4. **Ordem da rota de mapas:** rota otimizada típica de platina (NG → NG+ → NG++); será apresentada para revisão no checkpoint 1.
5. **Repositório git:** diretório não é repo ainda; `git init` quando for publicar.
