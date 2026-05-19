import { useEffect, useState } from "react";


import { Button } from "@/components/Button";

import { Backdrop } from "./components/Backdrop";
import { FiltroBar } from "./components/FiltroBar";
import { ProdutoModal } from "./components/ProdutoModal";
import { ProdutoTable } from "./components/ProdutoTable";
import { Sidebar } from "./components/Sidebar";

import { useProdutos } from "@/hooks/useProdutos";
import { filtrarProdutos } from "@/lib/filtrarProdutos";
import { useProdutoStore } from "@/store/useProdutoStore";
import type { Produto, ProdutoFormData } from "@/types/produto";
import { AnimatePresence, motion } from "framer-motion";

interface ProdutosProps {
  dark: boolean;
  onToggleTheme: () => void;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const, delay },
});

export function Produtos({ dark, onToggleTheme }: ProdutosProps) {
  const { produtos, filtros, isLoading } = useProdutoStore();
  const { buscarProdutos, criarProduto, atualizarProduto, excluirProduto } = useProdutos();
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    buscarProdutos();
  }, [buscarProdutos]);

  const produtosFiltrados = filtrarProdutos(produtos, filtros);

  const handleNovoProduto = () => {
    setProdutoEditando(null);
    setModalAberto(true);
  };

  const handleEditar = (produto: Produto) => {
    setProdutoEditando(produto);
    setModalAberto(true);
  };

  const handleExcluir = (id: number) => {
    if (window.confirm("Excluir este produto? Não tem volta.")) {
      excluirProduto(id);
    }
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setProdutoEditando(null);
  };

  const handleSalvar = async (data: ProdutoFormData) => {
    if (produtoEditando) {
      await atualizarProduto(produtoEditando.id, data);
    } else {
      await criarProduto(data);
    }
  };

  return (
    <div className="relative min-h-screen">
      <Backdrop />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          {...fadeUp(0)}
          className="mb-10 flex items-end justify-between border-b border-gray-100 pb-7 dark:border-white/5"
        >
          <div className="space-y-4">
            {/* Brand — mobile only (sidebar visible on lg) */}
            <div className="flex items-center gap-3 lg:hidden">
              <motion.div
                whileHover={{ rotate: -3 }}
                className="grid h-8 w-8 rotate-3 place-items-center bg-primary-500"
              >
                <span className="font-display -rotate-3 text-sm font-bold text-white">ma9</span>
              </motion.div>
              <span className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-primary-500">
                grupo ma9
              </span>
            </div>

            {/* Title */}
            <div>
              <p className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-primary-500">
                / catálogo
              </p>
              <h1 className="font-display text-4xl font-bold tracking-tighter text-light-text dark:text-dark-text md:text-5xl">
                Produtos
              </h1>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <motion.div
              animate={{
                borderColor: [
                  "rgba(0,185,124,0.3)",
                  "rgba(0,185,124,0.7)",
                  "rgba(0,185,124,0.3)",
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="flex items-center gap-2 border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-[10px] uppercase tracking-widest text-primary-500"
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="h-1.5 w-1.5 bg-primary-500"
              />
              Sistema Online
            </motion.div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 dark:text-white/30">
              ma9internet / prova prática
            </p>
          </div>
        </motion.header>

        {/* Grid layout */}
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar — desktop */}
          <motion.div
            {...fadeUp(0.1)}
            className="hidden lg:col-span-3 lg:block"
          >
            <Sidebar
              dark={dark}
              onToggleTheme={onToggleTheme}
              onNovoProduto={handleNovoProduto}
            />
          </motion.div>

          {/* Main content */}
          <div className="col-span-12 space-y-6 lg:col-span-9">
            {/* Mobile: novo produto button */}
            <motion.div {...fadeUp(0.12)} className="flex justify-end lg:hidden">
              <Button onClick={handleNovoProduto}>+ Novo produto</Button>
            </motion.div>

            {/* Filters */}
            <motion.div {...fadeUp(0.2)}>
              <FiltroBar />
            </motion.div>

            {/* Count + table */}
            <motion.div {...fadeUp(0.28)} className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 dark:text-white/30">
                  {isLoading ? (
                    <span className="inline-block h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
                  ) : (
                    <>{String(produtosFiltrados.length).padStart(2, "0")} / {String(produtos.length).padStart(2, "0")}</>
                  )}
                </p>
              </div>
              <ProdutoTable
                produtos={produtosFiltrados}
                isLoading={isLoading}
                onEditar={handleEditar}
                onExcluir={handleExcluir}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalAberto && (
          <ProdutoModal produto={produtoEditando} onFechar={handleFecharModal} onSalvar={handleSalvar} />
        )}
      </AnimatePresence>
    </div>
  );
}
