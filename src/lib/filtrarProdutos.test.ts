import type { Produto } from "@/types/produto";
import { describe, expect, it } from "vitest";

import { filtrarProdutos } from "./filtrarProdutos";

const produtos: Produto[] = [
  { id: 1, nome: "Notebook Dell", preco: 3500, categoria: "Eletrônicos", status: "Ativo" },
  { id: 2, nome: "Camiseta Polo", preco: 89.90, categoria: "Roupas", status: "Ativo" },
  { id: 3, nome: "Arroz Integral", preco: 12.50, categoria: "Alimentos", status: "Ativo" },
  { id: 4, nome: "Cadeira Gamer", preco: 1200, categoria: "Casa", status: "Inativo" },
  { id: 5, nome: "Tênis Running", preco: 299.90, categoria: "Esportes", status: "Ativo" },
];

describe("filtrarProdutos", () => {
  it("retorna todos os produtos quando nenhum filtro é aplicado", () => {
    const resultado = filtrarProdutos(produtos, { categoria: "", precoMin: "", precoMax: "", status: "Todos" });
    expect(resultado).toHaveLength(5);
  });

  it("filtra por categoria", () => {
    const resultado = filtrarProdutos(produtos, { categoria: "Eletrônicos" });
    expect(resultado).toHaveLength(1);
    expect(resultado[0].nome).toBe("Notebook Dell");
  });

  it("filtra por status Ativo", () => {
    const resultado = filtrarProdutos(produtos, { status: "Ativo" });
    expect(resultado).toHaveLength(4);
    expect(resultado.every((p) => p.status === "Ativo")).toBe(true);
  });

  it("filtra por status Inativo", () => {
    const resultado = filtrarProdutos(produtos, { status: "Inativo" });
    expect(resultado).toHaveLength(1);
    expect(resultado[0].nome).toBe("Cadeira Gamer");
  });

  it("filtra por preço mínimo", () => {
    const resultado = filtrarProdutos(produtos, { precoMin: 300 });
    expect(resultado).toHaveLength(2);
    expect(resultado.every((p) => p.preco >= 300)).toBe(true);
  });

  it("filtra por preço máximo", () => {
    const resultado = filtrarProdutos(produtos, { precoMax: 100 });
    expect(resultado).toHaveLength(2);
    expect(resultado.every((p) => p.preco <= 100)).toBe(true);
  });

  it("filtra por faixa de preço (min e max)", () => {
    const resultado = filtrarProdutos(produtos, { precoMin: 100, precoMax: 1500 });
    expect(resultado).toHaveLength(2);
    expect(resultado.map((p) => p.nome)).toEqual(
      expect.arrayContaining(["Cadeira Gamer", "Tênis Running"])
    );
  });

  it("filtra com múltiplos critérios combinados", () => {
    const resultado = filtrarProdutos(produtos, {
      categoria: "Eletrônicos",
      status: "Ativo",
      precoMin: 1000,
    });
    expect(resultado).toHaveLength(1);
    expect(resultado[0].nome).toBe("Notebook Dell");
  });

  it("retorna array vazio quando nenhum produto corresponde", () => {
    const resultado = filtrarProdutos(produtos, {
      categoria: "Eletrônicos",
      precoMax: 50,
    });
    expect(resultado).toHaveLength(0);
  });

  it("não filtra quando status é Todos", () => {
    const resultado = filtrarProdutos(produtos, { status: "Todos" });
    expect(resultado).toHaveLength(5);
  });
});
