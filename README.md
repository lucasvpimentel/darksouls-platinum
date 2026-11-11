# Lordran — Guia de Platina (Dark Souls Remastered)

Checklist interativo sem spoilers para a platina de Dark Souls: Remastered. Site estático (HTML + CSS + JS com módulos nativos): sem build, sem backend, pronto para o GitHub Pages.

**Seções:** Rota de Mapas · Atlas (diagrama, mapas, matriz) · 41 Conquistas · Armas Raras · Magias · Aprimoramentos · Farm · Builds · Dados & Nuvem.

## Rodar localmente

Módulos ES não carregam via `file://`; use um servidor local:

```bash
npm run serve    # ou: python -m http.server 8080
```

Abra `http://localhost:8080`. Testes (Node 18+, sem dependências):

```bash
npm test
```

## Deploy gratuito no GitHub Pages

1. No repositório, vá em **Settings → Pages**.
2. Em **Build and deployment**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`, e salve.
3. Aguarde ~1 minuto. O site fica em `https://<usuario>.github.io/<repositorio>/`.
4. Cada `git push` na `main` republica automaticamente.

O app usa só caminhos relativos, então funciona em subpasta.

## Login — leia isto

O "portão" usuário + PIN é **só uma barreira de interface**. Num site estático o hash da credencial fica em `js/auth.js`, público, e um PIN de 4 dígitos é quebrado por força bruta em segundos. Não coloque nada realmente secreto atrás dele. Na prática o progresso já é isolado por navegador (`localStorage`), então visitantes não alteram o seu.

Para trocar a credencial, gere o novo hash e substitua `HASH` em `js/auth.js`:

```bash
node -e "crypto.subtle.digest('SHA-256',new TextEncoder().encode('dsr-lordvessel-v1|SEU_USUARIO|SEU_PIN')).then(b=>console.log(Buffer.from(b).toString('hex')))"
```

## Persistência (3 camadas)

| Camada | O que faz |
|---|---|
| **Auto-save local** | Grava a cada alteração (debounce de 400 ms) em `localStorage`, chave `dsr_platinum_v1`, com schema versionado. Saves antigos ou corrompidos são copiados para backup antes de qualquer migração. |
| **Nuvem (GitHub Gist)** | **Salvar na Nuvem / Carregar da Nuvem** em *Dados & Nuvem*. Usa um Gist **privado** seu; o GitHub guarda o histórico de revisões. |
| **Arquivo JSON** | Baixar/Importar em *Dados & Nuvem*. Contingência final. |

### Configurar a nuvem

1. GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. Expiração à sua escolha; em **Account permissions** marque **Gists: Read and write**. Nenhuma outra permissão.
3. Copie o token e cole em *Dados & Nuvem → Token do GitHub*.
4. Clique **Salvar na Nuvem**: o app encontra ou cria o Gist `dsr_platinum_v1.json` e guarda o ID.
5. Em outro aparelho: cole o mesmo token e clique **Carregar da Nuvem**.

Segurança do token: fica só no `localStorage` deste navegador, nunca no save nem no export. O app não carrega scripts de terceiros (só fontes do Google), o que reduz o risco de vazamento. Se suspeitar de vazamento, revogue o token no GitHub. Se a nuvem mudou depois do seu último sync, o app pede confirmação antes de sobrescrever.

## Mapas (imagens)

Os mapas das áreas vêm do guia da Steam #3094082097 (autor Baba Yaga), carregados direto da CDN da Steam e **não** copiados para o repositório, porque o guia não traz licença. Uma imagem em `assets/maps/<id>.jpg` tem prioridade (ver [assets/maps/README.md](assets/maps/README.md)). Quelaag, Valley of Drakes, Abyss, Firelink Altar e Kiln não têm mapa no guia e mostram a planta vetorial. O link do mapa 3D abre o [dsmap.link](https://dsmap.link/#/ds1) em nova aba.

## Qualidade dos dados

- **Conferidos** contra guias de conquistas da Fextralife: armas raras (49 itens), magias (24/19/23).
- **Conferidos depois**: pactos, Darkwraith e requisitos de aprimoramento (Fextralife); pesos e poise do simulador de carga.
- **Do briefing do projeto, ainda não conferidos** (marcados **verificar**): locais das brasas, aba Farm, matriz de conexões do Atlas, atributos e itens das builds/memebuilds.
- O briefing falava em 50 armas raras; as fontes conferidas listam 49 (ver comentário em `js/data/weapons.js`).

## Estrutura

```
index.html  styles.css
js/app.js        orquestra login, header, rotas
js/store.js      estado único + auto-save + migração
js/sync.js       Gist (push/pull)
js/data/*.js     dados (IDs estáveis = chaves do save: nunca renomear)
js/views/*.js    uma view por seção; list.js é a lista filtrável genérica
tests/           node --test
```
