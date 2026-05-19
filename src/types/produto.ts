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

export interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  categoria: CategoriaEnum;
  status: StatusProduto;
}

export type ProdutoFormData = Omit<Produto, "id">;

export interface FiltroProduto {
  categoria?: CategoriaEnum | "";
  precoMin?: number | "";
  precoMax?: number | "";
  status?: StatusProduto | "Todos";
}
