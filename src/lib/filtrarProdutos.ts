import type { FiltroProduto, Produto } from "@/types/produto";

export function filtrarProdutos(
  produtos: Produto[],
  filtros: FiltroProduto
): Produto[] {
  return produtos.filter((p) => {
    if (filtros.categoria && p.categoria !== filtros.categoria) return false;

    if (filtros.precoMin !== "" && filtros.precoMin !== undefined) {
      if (p.preco < Number(filtros.precoMin)) return false;
    }

    if (filtros.precoMax !== "" && filtros.precoMax !== undefined) {
      if (p.preco > Number(filtros.precoMax)) return false;
    }

    if (filtros.status && filtros.status !== "Todos") {
      if (p.status !== filtros.status) return false;
    }

    return true;
  });
}
