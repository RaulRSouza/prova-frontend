import { useCallback } from "react";


import { api } from "@/api";
import { useProdutoStore } from "@/store/useProdutoStore";
import type { Produto, ProdutoFormData } from "@/types/produto";
import { toast } from "sonner";

export function useProdutos() {
  const { setProdutos, setLoading, setError } = useProdutoStore();

  const buscarProdutos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Produto[]>("/produtos");
      setProdutos(data);
    } catch {
      setError("Erro ao carregar produtos.");
      toast.error("Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  }, [setProdutos, setLoading, setError]);

  const criarProduto = useCallback(
    async (dados: ProdutoFormData) => {
      try {
        await api.post("/produtos", dados);
        toast.success("Produto cadastrado.");
        await buscarProdutos();
      } catch {
        toast.error("Erro ao cadastrar produto.");
        throw new Error("Erro ao cadastrar produto.");
      }
    },
    [buscarProdutos]
  );

  const atualizarProduto = useCallback(
    async (id: number, dados: ProdutoFormData) => {
      try {
        await api.put(`/produtos/${id}`, dados);
        toast.success("Alterações salvas.");
        await buscarProdutos();
      } catch {
        toast.error("Erro ao atualizar produto.");
        throw new Error("Erro ao atualizar produto.");
      }
    },
    [buscarProdutos]
  );

  const excluirProduto = useCallback(
    async (id: number) => {
      try {
        await api.delete(`/produtos/${id}`);
        toast.success("Produto removido.");
        await buscarProdutos();
      } catch {
        toast.error("Erro ao excluir produto.");
        throw new Error("Erro ao excluir produto.");
      }
    },
    [buscarProdutos]
  );

  return { buscarProdutos, criarProduto, atualizarProduto, excluirProduto };
}
