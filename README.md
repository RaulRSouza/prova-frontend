# ma9 / Prova Prática Frontend

CRUD via json-server. Filtros por categoria, preço e status. Tema dark/light.

## Pré-requisitos

| Ferramenta | Versão |
|---|---|
| Node.js | >= 22.x |
| npm | >= 10.x |

## Rodando localmente

```bash
# API mock na porta 3001
npx json-server db.json --port 3001

# Frontend em outro terminal
npm run dev
```

Abra `http://localhost:8084`.

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Build de produção |
| `npm run preview` | Visualiza o build localmente |
| `npm run lint` | ESLint |
| `npm run test` | Testes em watch mode |
| `npm run test:run` | Roda os testes e encerra |

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| Estilo | SCSS + Tailwind CSS 3 |
| Roteamento | wouter |
| Estado global | Zustand |
| Formulários | React Hook Form |
| HTTP | axios |
| Toasts | sonner |
| Testes | Vitest + @testing-library/react |
| API mock | json-server |

## Por que essas escolhas

Zustand centraliza `produtos[]`, `filtros` e `isLoading` num store único. Testei Context API primeiro, mas os re-renders ficaram difíceis de controlar sem memoization manual em cada consumidor.

A função `filtrarProdutos` é propositalmente pura. Fica fora dos componentes, e o Vitest testa ela diretamente sem precisar montar nada. São 10 casos: filtro por nome (partial match), por categoria, por status, por faixa de preço, e combinações. Se a lógica mudar, os testes quebram antes de chegar no browser.

`Input` e `Select` encapsulam o `useController` internamente. Quem usa o componente só passa `name`, `control` e `rules`. Sem `register` espalhado por formulário, sem boilerplate repetido.

wouter no lugar de react-router-dom porque o bundle é muito menor. react-router-dom vale quando você precisa de rotas aninhadas, outlets e loaders. Nenhum desses casos existe aqui.

json-server sobe uma REST API a partir do `db.json` sem nenhuma linha de back-end. Suficiente para um CRUD real durante o desenvolvimento.

SCSS cuida dos design tokens (`$brand-primary`, `$grid-size`, `$mono-stack`), dos mixins de grid e glow, e do nesting do tema dark. Tailwind cobre o restante como utility classes. Os dois coexistem sem conflito.

## Estrutura

```
src/
  api/              # instância axios
  app/
    (private)/
      Produtos/
        components/ # Backdrop, Sidebar, FiltroBar, ProdutoTable, ProdutoModal
        Produtos.tsx
  components/       # Button, Input, Select (primitivos genéricos)
  hooks/            # useProdutos (buscar, criar, atualizar, excluir)
  lib/              # filtrarProdutos + testes
  store/            # useProdutoStore (Zustand)
  styles/           # global.scss (tokens, mixins, grid backdrop)
  types/            # Produto, FiltroProduto, enums
specs/              # spec, data-model, plano e checklist da feature
```
