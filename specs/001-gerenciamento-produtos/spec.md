# Spec: Gerenciamento de Produtos

**Feature directory:** `specs/001-gerenciamento-produtos`
**Status:** Ready for planning
**Created:** 2026-05-19

---

## Overview

Sistema web para gerenciamento de produtos de um e-commerce. Permite que operadores cadastrem, editem, excluam e consultem produtos, com filtros por categoria, faixa de preço e status.

---

## Actors

| Ator | Descrição |
|---|---|
| Operador | Usuário autenticado que gerencia o catálogo de produtos |

---

## User Scenarios

### Cenário 1 — Listar produtos
O operador acessa a tela principal e visualiza todos os produtos cadastrados em uma tabela/lista. Pode aplicar filtros para refinar os resultados.

### Cenário 2 — Cadastrar produto
O operador clica em "Novo Produto", preenche o formulário (nome, descrição, preço, categoria, status) e confirma. O produto aparece na listagem imediatamente.

### Cenário 3 — Editar produto
Na listagem, o operador clica em "Editar" em um produto existente. O formulário abre pré-preenchido com os dados atuais. Após salvar, as alterações refletem na listagem.

### Cenário 4 — Excluir produto
Na listagem, o operador clica em "Excluir". Um diálogo de confirmação é exibido. Após confirmar, o produto é removido da listagem.

### Cenário 5 — Filtrar produtos
O operador aplica um ou mais filtros (categoria, faixa de preço, status). A listagem atualiza em tempo real mostrando apenas os produtos que correspondem aos critérios.

---

## Functional Requirements

### FR-01 — Listagem de produtos
- Exibir todos os produtos com: nome, categoria, preço, status
- Suportar filtro por **categoria** (seleção única ou múltipla)
- Suportar filtro por **faixa de preço** (preço mínimo e máximo)
- Suportar filtro por **status** (Ativo / Inativo)
- Filtros podem ser combinados simultaneamente
- Exibir estado vazio quando nenhum produto corresponde ao filtro

### FR-02 — Cadastro de produto
- Campos obrigatórios: nome, preço, categoria, status
- Campos opcionais: descrição
- Validações:
  - Nome: mínimo 3 caracteres, máximo 100
  - Preço: número positivo, maior que zero
  - Categoria: seleção de lista predefinida
  - Status: Ativo ou Inativo
- Feedback de sucesso ao salvar
- Feedback de erro em caso de falha na API

### FR-03 — Edição de produto
- Formulário idêntico ao de cadastro, pré-preenchido
- Mesmas validações do cadastro
- Feedback de sucesso/erro

### FR-04 — Exclusão de produto
- Confirmação antes de excluir (modal ou diálogo nativo)
- Feedback de sucesso/erro
- Produto removido da listagem imediatamente após exclusão

### FR-05 — Feedback de carregamento
- Estado de loading visível durante operações assíncronas (buscar, salvar, excluir)
- Tratamento de erros de rede com mensagem amigável

### FR-06 — Mock API (json-server)
- Endpoints necessários:
  - `GET /produtos` — listar com query params de filtro
  - `POST /produtos` — criar
  - `PUT /produtos/:id` — editar
  - `DELETE /produtos/:id` — excluir
- `db.json` com dados iniciais de exemplo (mínimo 5 produtos, 3 categorias)

### FR-07 — Testes
- Cobertura obrigatória: lógica de filtro (pelo menos uma função de filtro testada com Vitest)
- Cobertura desejável: validações do formulário, hooks de produto

---

## Data Model

### Produto
```typescript
interface Produto {
  id: string | number;
  nome: string;
  descricao?: string;
  preco: number;
  categoria: string;
  status: "Ativo" | "Inativo";
}
```

### Filtros
```typescript
interface FiltroProduto {
  categoria?: string;
  precoMin?: number;
  precoMax?: number;
  status?: "Ativo" | "Inativo" | "Todos";
}
```

---

## Architecture Decisions

| Decisão | Escolha | Motivo |
|---|---|---|
| State management | Zustand | Já no projeto, simples para CRUD |
| Formulários | React Hook Form | Validação declarativa, performance |
| Roteamento | wouter | Já no projeto, leve |
| HTTP client | axios | Já no projeto, interceptors |
| Mock API | json-server | Requisito da prova |
| Testes | Vitest + Testing Library | Integrado ao Vite |
| Estilização | Tailwind CSS | Já no projeto |

---

## Success Criteria

- [ ] Operador consegue cadastrar um produto em menos de 1 minuto
- [ ] Filtros reduzem a lista corretamente para qualquer combinação de critérios
- [ ] Nenhuma operação (criar/editar/excluir) deixa a UI em estado inconsistente
- [ ] Testes do filtro passam com 100% dos casos cobertos
- [ ] Projeto roda com `npm install && npm run dev` + `npx json-server db.json`

---

## Scope

**Incluso:**
- CRUD de produtos
- Filtros por categoria, preço e status
- Mock API com json-server
- Testes do filtro
- README com instruções e decisões técnicas

**Fora do escopo:**
- Autenticação (sem login real)
- Upload de imagens
- Paginação (desejável, não obrigatório)
- Deploy

---

## Assumptions

- Categorias são predefinidas (ex.: Eletrônicos, Roupas, Alimentos, Casa, Esportes)
- Não há múltiplos usuários / permissões
- json-server roda na porta 3001
- Projeto entregue em repositório público no GitHub
