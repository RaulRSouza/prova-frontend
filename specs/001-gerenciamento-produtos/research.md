# Research: Gerenciamento de Produtos

**Created:** 2026-05-19

---

## Decisão: Testes com Vitest

- **Escolha:** Vitest + @testing-library/react
- **Motivo:** Integrado nativamente ao Vite — zero config extra. `@testing-library/react` segue boas práticas de teste orientado ao usuário.
- **Setup necessário:** `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`
- **Alternativa descartada:** Jest — requer transformadores extras para ESM/Vite.

---

## Decisão: Estratégia de filtro

- **Escolha:** Filtro no cliente (filter em array) com fallback para query params no json-server
- **Motivo:** json-server suporta `?categoria=X&status=Ativo` nativamente. Para faixa de preço, json-server suporta `?preco_gte=10&preco_lte=100`. Isso permite testar a lógica de filtro isoladamente no cliente também.
- **Testável:** função `filtrarProdutos(produtos, filtros)` pura — fácil de testar unitariamente.

---

## Decisão: Estrutura do store Zustand

- **Escolha:** Um store `useProdutoStore` com estado de produtos + filtros + loading/error
- **Motivo:** Mantém toda lógica de UI em um lugar, separado do fetching (hooks)
- **Pattern:** Store guarda `produtos[]`, `filtros`, `isLoading`, `error`. Hooks fazem o fetch e atualizam o store.

---

## Decisão: Formulário com React Hook Form + validação

- **Escolha:** `useForm` com validação nativa (rules) — sem Zod por ora
- **Motivo:** Reduz dependências. Validações são simples (required, min, max, pattern). Zod seria overkill para este escopo.
- **Alternativa considerada:** Zod + resolver — útil se o schema crescer, pode adicionar depois.

---

## Decisão: Roteamento de produto

- **Escolha:** `/produtos` (listagem) + modal para criar/editar (sem rota separada)
- **Motivo:** UX mais fluida, menos rotas para gerenciar. Modal com React state local.
- **Alternativa:** `/produtos/novo` e `/produtos/:id/editar` — mais URLs, necessário para compartilhar link de edição (não é requisito aqui).

---

## Decisão: db.json inicial

```json
{
  "produtos": [
    { "id": 1, "nome": "Notebook Dell", "descricao": "15 polegadas, 16GB RAM", "preco": 3500, "categoria": "Eletrônicos", "status": "Ativo" },
    { "id": 2, "nome": "Camiseta Polo", "descricao": "100% algodão", "preco": 89.90, "categoria": "Roupas", "status": "Ativo" },
    { "id": 3, "nome": "Arroz Integral", "descricao": "Pacote 1kg", "preco": 12.50, "categoria": "Alimentos", "status": "Ativo" },
    { "id": 4, "nome": "Cadeira Gamer", "descricao": "Ergonômica, reclinável", "preco": 1200, "categoria": "Casa", "status": "Inativo" },
    { "id": 5, "nome": "Tênis Running", "descricao": "Solado amortecedor", "preco": 299.90, "categoria": "Esportes", "status": "Ativo" }
  ]
}
```

**Categorias disponíveis:** Eletrônicos, Roupas, Alimentos, Casa, Esportes
