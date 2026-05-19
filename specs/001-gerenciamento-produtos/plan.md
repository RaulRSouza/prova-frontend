# Implementation Plan: Gerenciamento de Produtos

**Created:** 2026-05-19
**Spec:** [spec.md](./spec.md)
**Research:** [research.md](./research.md)
**Data Model:** [data-model.md](./data-model.md)

---

## Fases de implementação

### Fase 1 — Setup e fundação
**Objetivo:** Projeto rodando, json-server funcionando, tipos definidos

- [ ] Instalar dependências de teste: `vitest @testing-library/react @testing-library/jest-dom jsdom`
- [ ] Configurar Vitest no `vite.config.ts`
- [ ] Criar `src/types/produto.ts` (interfaces + enums + CATEGORIAS)
- [ ] Criar `db.json` com 5 produtos de exemplo
- [ ] Criar `src/api/index.ts` (axios, baseURL: localhost:3001)
- [ ] Verificar que `npm run dev` + `npx json-server db.json --port 3001` sobem sem erro

---

### Fase 2 — Store e lógica de negócio
**Objetivo:** Estado centralizado + lógica de filtro testável

- [ ] Criar `src/store/useProdutoStore.ts` (Zustand)
- [ ] Criar `src/lib/filtrarProdutos.ts` (função pura)
- [ ] Criar `src/lib/filtrarProdutos.test.ts` (testes Vitest)
  - [ ] Teste: filtro por categoria
  - [ ] Teste: filtro por faixa de preço
  - [ ] Teste: filtro por status
  - [ ] Teste: filtros combinados
  - [ ] Teste: sem filtros retorna todos
- [ ] Criar `src/hooks/useProdutos.ts` (useQuery/useMutation com React Query ou fetch manual)

---

### Fase 3 — Componentes base
**Objetivo:** Button, Input e layout prontos

- [ ] `src/components/Button/index.tsx` (variantes: primary, outline, danger)
- [ ] `src/components/Input/index.tsx` (label, error message, controlled)
- [ ] Configurar App.tsx com roteamento wouter (`/produtos`)

---

### Fase 4 — Tela de produtos
**Objetivo:** Listagem, filtros e ações funcionando

- [ ] `src/components/FiltroBar/index.tsx`
  - Select de categoria
  - Inputs de preço mínimo/máximo
  - Select de status
  - Botão limpar filtros
- [ ] `src/components/ProdutoTable/index.tsx`
  - Colunas: nome, categoria, preço, status, ações
  - Botões editar/excluir por linha
  - Estado vazio
  - Estado de loading (skeleton ou spinner)
- [ ] `src/app/(private)/Produtos/Produtos.tsx`
  - Composição: FiltroBar + ProdutoTable + botão "Novo Produto"
  - Conectar store + hook

---

### Fase 5 — Modal de criação/edição
**Objetivo:** Formulário com validação funcionando

- [ ] `src/components/ProdutoModal/index.tsx`
  - React Hook Form com validações (nome, preço, categoria, status)
  - Modo criar (campos vazios) e modo editar (pré-preenchido)
  - Feedback de loading no botão submit
  - Fechar modal após sucesso
- [ ] Toast de sucesso/erro (sonner já instalado)
- [ ] Confirmação de exclusão (window.confirm ou modal simples)

---

### Fase 6 — Polimento e entrega
**Objetivo:** Responsividade, README, testes passando

- [ ] Responsividade básica (tabela scrollável no mobile)
- [ ] README com: como rodar, decisões técnicas, stack
- [ ] `npm run lint` sem erros
- [ ] `npm run build` sem erros
- [ ] Todos os testes passando (`npm run test`)
- [ ] Commit final limpo

---

## Ordem de execução recomendada

```
Fase 1 (setup) → Fase 2 (store + testes) → Fase 3 (components base)
→ Fase 4 (listagem + filtros) → Fase 5 (modal CRUD) → Fase 6 (polish)
```

## Estimativa

| Fase | Complexidade |
|---|---|
| 1 — Setup | Baixa |
| 2 — Store + testes | Média |
| 3 — Components base | Baixa |
| 4 — Listagem + filtros | Média |
| 5 — Modal CRUD | Média/Alta |
| 6 — Polimento | Baixa |
