import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { useProdutos } from "@/hooks/useProdutos";
import { CATEGORIAS } from "@/types/produto";
import type { Produto, ProdutoFormData } from "@/types/produto";

interface ProdutoModalProps {
  produto?: Produto | null;
  onFechar: () => void;
}

const categoriaOptions = CATEGORIAS.map((c) => ({ value: c, label: c }));

const statusOptions = [
  { value: "Ativo", label: "Ativo" },
  { value: "Inativo", label: "Inativo" },
];

export function ProdutoModal({ produto, onFechar }: ProdutoModalProps) {
  const isEditando = !!produto;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { criarProduto, atualizarProduto } = useProdutos();

  const { control, handleSubmit, reset } = useForm<ProdutoFormData>({
    defaultValues: {
      nome: "",
      descricao: "",
      preco: 0,
      categoria: "Eletrônicos",
      status: "Ativo",
    },
  });

  useEffect(() => {
    if (produto) {
      reset({
        nome: produto.nome,
        descricao: produto.descricao ?? "",
        preco: produto.preco,
        categoria: produto.categoria,
        status: produto.status,
      });
    } else {
      reset({
        nome: "",
        descricao: "",
        preco: 0,
        categoria: "Eletrônicos",
        status: "Ativo",
      });
    }
  }, [produto, reset]);

  const onSubmit = async (data: ProdutoFormData) => {
    setIsSubmitting(true);
    try {
      const payload = { ...data, preco: Number(data.preco) };
      if (isEditando && produto) {
        await atualizarProduto(produto.id, payload);
      } else {
        await criarProduto(payload);
      }
      onFechar();
    } catch {
      // erro já tratado com toast no hook
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onFechar()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full max-w-md border border-gray-100 bg-white shadow-2xl dark:border-primary-500/20 dark:bg-dark-card shadow-glow"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-white/5">
          <div>
            <div>
              <p className="mb-0.5 font-mono text-[10px] uppercase tracking-[0.25em] text-primary-500">
                {isEditando ? "/ editar registro" : "/ novo registro"}
              </p>
              <h2 className="font-display text-xl font-bold text-light-text dark:text-dark-text">
                {isEditando ? "Editar produto" : "Cadastrar produto"}
              </h2>
            </div>
            <p className="mt-0.5 hidden text-xs text-gray-400">
              {isEditando ? "Atualize os dados do produto" : "Preencha os campos para cadastrar"}
            </p>
          </div>
          <button
            onClick={onFechar}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6 py-5">
          <Input
            name="nome"
            label="Nome"
            placeholder="Ex: Notebook Dell"
            control={control}
            required
            rules={{
              required: "Nome é obrigatório",
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
              maxLength: { value: 100, message: "Máximo 100 caracteres" },
            }}
          />

          <Input
            name="descricao"
            label="Descrição"
            placeholder="opcional"
            control={control}
          />

          <Input
            name="preco"
            label="Preço (R$)"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0,00"
            control={control}
            required
            rules={{
              required: "Preço é obrigatório",
              min: { value: 0.01, message: "mínimo R$ 0,01" },
            }}
          />

          <Select
            name="categoria"
            label="Categoria"
            control={control}
            options={categoriaOptions}
            required
            rules={{ required: "Categoria é obrigatória" }}
          />

          <Select
            name="status"
            label="Status"
            control={control}
            options={statusOptions}
            required
            rules={{ required: "Status é obrigatório" }}
          />

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onFechar}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {isEditando ? "Salvar alterações" : "Cadastrar"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
