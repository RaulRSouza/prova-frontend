import type { FiltroProduto, Produto } from "@/types/produto";
import { create } from "zustand";


interface ProdutoState {
  produtos: Produto[];
  filtros: FiltroProduto;
  isLoading: boolean;
  error: string | null;

  setProdutos: (produtos: Produto[]) => void;
  setFiltros: (filtros: FiltroProduto) => void;
  resetFiltros: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const filtrosIniciais: FiltroProduto = {
  categoria: "",
  precoMin: "",
  precoMax: "",
  status: "Todos",
};

export const useProdutoStore = create<ProdutoState>((set) => ({
  produtos: [],
  filtros: filtrosIniciais,
  isLoading: false,
  error: null,

  setProdutos: (produtos) => set({ produtos }),
  setFiltros: (filtros) => set((state) => ({ filtros: { ...state.filtros, ...filtros } })),
  resetFiltros: () => set({ filtros: filtrosIniciais }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
