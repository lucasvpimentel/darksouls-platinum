# Decisão de persistência: Local + Nuvem

GitHub Pages é estático: não há servidor próprio, então todo dado vive no navegador ou num serviço de terceiros acessado por REST.

## Comparação

| Opção | Prós | Contras | Veredito |
|---|---|---|---|
| `localStorage` | Síncrono, simples; o save inteiro tem poucos KB | Por navegador/aparelho; some ao limpar dados; indisponível em alguns modos privados | **Camada 1** |
| `IndexedDB` | Mais espaço, assíncrono | Complexidade sem ganho para JSON pequeno | Descartado (YAGNI) |
| **GitHub Gist API** (PAT com escopo `gist`) | Dados seus, Gist privado, histórico de revisões grátis, CORS liberado, sem terceiro novo | PAT precisa ser colado uma vez por aparelho; fica no navegador | **Camada 2 (recomendada)** |
| JSONBin / Supabase anônimo | Chave curta de sync | Terceiro, quotas, chave de 6–8 dígitos é adivinhável, serviço pode mudar | Descartado |
| URL hash comprimida | Zero infra, portátil | Limite de tamanho, sem histórico, sync manual. `CompressionStream` nativo dispensa LZ-string | Extra opcional (Fase 5) |
| Export/Import JSON | Contingência total | Manual | **Camada 3** |

## Estratégia
1. **Auto-save local** (implementado): debounce de 400 ms, chave `dsr_platinum_v1`, `schemaVersion` com cadeia de migrações, backup do save antigo/corrompido antes de sobrescrever, aviso se o navegador não deixa gravar.
2. **Gist** (Fase 5): Push/Pull explícitos. Compara `updatedAt` local × remoto e pede confirmação se o outro lado for mais novo. Sem merge automático.
3. **Arquivo JSON** (Fase 5): exporta/importa validando o schema.

## Segurança
- O PAT é o único segredo real. Use token **fine-grained** só com permissão de Gist. Ele fica em `localStorage` e **nunca** entra no export.
- O app não carrega scripts de terceiros (só fontes do Google), o que reduz o risco de XSS ler o token.
- O login `usuário + PIN` é um portão de UX: o hash fica num arquivo público e 4 dígitos são força-bruta trivial. O progresso já é isolado por navegador.
