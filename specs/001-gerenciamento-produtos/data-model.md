# Data Model: Gerenciamento de Produtos

**Created:** 2026-05-19

---

## Entidades

### Produto

```typescript
// src/types/produto.ts
export interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  categoria: CategoriaEnum;
  status: StatusProduto;
}

export type StatusProduto = "Ativo" | "Inativo";

export type CategoriaEnum =
  | "Eletrônicos"
  | "Roupas"
  | "Alimentos"
  | "Casa"
  | "Esportes";

export const CATEGORIAS: CategoriaEnum[] = [
  "Eletrônicos",
  "Roupas",
  "Alimentos",
  "Casa",
  "Esportes",
];
```

### Filtros

```typescript
// src/types/filtro.ts
export interface FiltroProduto {
  categoria?: CategoriaEnum | "";
  precoMin?: number | "";
  precoMax?: number | "";
  status?: StatusProduto | "Todos";
}
```

### Form Data (React Hook Form)

```typescript
// src/types/produto.ts
export type ProdutoFormData = Omit<Produto, "id">;
```

---

## Zustand Store

```typescript
// src/store/useProdutoStore.ts
interface ProdutoState {
  produtos: Produto[];
  filtros: FiltroProduto;
  isLoading: boolean;
  error: string | null;

  setProdutos: (produtos: Produto[]) => void;
  setFiltros: (filtros: FiltroProduto) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
```

---

## Estrutura de arquivos final

```
src/
├── App.tsx                          ← Router + rotas
├── main.tsx
├── api/
│   └── index.ts                     ← axios instance (baseURL: localhost:3001)
├── app/
│   └── (private)/
│       └── Produtos/
│           └── Produtos.tsx         ← página principal (listagem + modais)
├── components/
│   ├── Button/
│   │   └── index.tsx
│   ├── Input/
│   │   └── index.tsx
│   ├── ProdutoModal/
│   │   └── index.tsx                ← modal criar/editar
│   ├── ProdutoTable/
│   │   └── index.tsx                ← tabela de listagem
│   └── FiltroBar/
│       └── index.tsx                ← barra de filtros
├── hooks/
│   └── useProdutos.ts               ← fetch, create, update, delete
├── store/
│   └── useProdutoStore.ts           ← Zustand store
├── types/
│   └── produto.ts                   ← interfaces + enums
├── lib/
│   └── utils.ts                     ← cn() helper
│   └── filtrarProdutos.ts           ← função pura de filtro (testável)
├── mocks/
│   └── db.json                      ← json-server database
└── styles/
    └── global.css
```

---

## Fluxo de dados

```
json-server (porta 3001)
    ↓ axios (src/api/index.ts)
    ↓ useProdutos hook (fetch/mutate)
    ↓ useProdutoStore (Zustand)
    ↓ Produtos.tsx (página)
    ↓ ProdutoTable + FiltroBar + ProdutoModal (componentes)
```

---

## Lógica de filtro (testável isoladamente)

```typescript
// src/lib/filtrarProdutos.ts
export function filtrarProdutos(
  produtos: Produto[],
  filtros: FiltroProduto
): Produto[] {
  return produtos.filter((p) => {
    if (filtros.categoria && p.categoria !== filtros.categoria) return false;
    if (filtros.precoMin !== "" && p.preco < Number(filtros.precoMin)) return false;
    if (filtros.precoMax !== "" && p.preco > Number(filtros.precoMax)) return false;
    if (filtros.status && filtros.status !== "Todos" && p.status !== filtros.status) return false;
    return true;
  });
}
```

Esta função é pura (sem side effects) → fácil de testar unitariamente com Vitest.
