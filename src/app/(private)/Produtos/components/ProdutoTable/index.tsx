
import { Button } from "@/components/Button";

import type { Produto } from "@/types/produto";
import { motion } from "framer-motion";

interface ProdutoTableProps {
  produtos: Produto[];
  isLoading: boolean;
  onEditar: (produto: Produto) => void;
  onExcluir: (id: number) => void;
}

function StatusBadge({ status }: { status: Produto["status"] }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        status === "Ativo"
          ? "bg-primary-50 text-primary-700"
          : "bg-red-50 text-red-600"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Ativo" ? "bg-primary-500" : "bg-red-500"
        }`}
      />
      {status}
    </span>
  );
}

function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 rounded-md bg-gray-100" style={{ width: `${[60, 40, 30, 25, 35][i]}%` }} />
        </td>
      ))}
    </tr>
  );
}

export function ProdutoTable({
  produtos,
  isLoading,
  onEditar,
  onExcluir,
}: ProdutoTableProps) {
  return (
    <div className="overflow-x-auto border border-gray-100 bg-white/80 backdrop-blur-sm dark:border-white/5 dark:bg-dark-card/60">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left dark:border-white/5">
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-white/30">Produto</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-white/30">Tag</th>
            <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-white/30">Valor</th>
            <th className="px-6 py-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-white/30">Estado</th>
            <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-white/30">OP</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-white/5">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
          ) : produtos.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-16 text-center">
                <p className="font-mono text-sm uppercase tracking-widest text-gray-400 dark:text-white/30">/ nenhum registro</p>
                <p className="mt-1 font-mono text-xs text-gray-300 dark:text-white/20">tente outros filtros</p>
              </td>
            </tr>
          ) : (
            produtos.map((produto, i) => (
              <motion.tr
                key={produto.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: i * 0.04, ease: "easeOut" }}
                className="group border-b border-gray-50 transition-colors hover:bg-primary-50/20 dark:border-white/5 dark:hover:bg-white/[0.025]"
              >
                <td className="px-6 py-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-primary-500/60">#{String(produto.id).padStart(4,"0")}</span>
                    <div>
                      <p className="font-semibold text-light-text dark:text-dark-text">{produto.nome}</p>
                      {produto.descricao && (
                        <p className="mt-0.5 text-xs font-normal uppercase tracking-tight text-gray-400 dark:text-white/30 line-clamp-1">
                          {produto.descricao}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`border px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                    produto.status === "Ativo"
                      ? "border-primary-500/30 text-primary-500"
                      : "border-gray-200 text-gray-400 dark:border-white/10 dark:text-white/30"
                  }`}>
                    {produto.categoria}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <span className="font-mono text-base font-bold tabular-nums text-light-text dark:text-dark-text">
                    {produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                </td>
                <td className="px-6 py-5 text-center">
                  <StatusBadge status={produto.status} />
                </td>
                <td className="px-6 py-5">
                  <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                    <Button variant="outline" className="h-7 px-2.5 text-[10px]" onClick={() => onEditar(produto)}>
                      Editar
                    </Button>
                    <Button variant="danger" className="h-7 px-2.5 text-[10px]" onClick={() => onExcluir(produto.id)}>
                      Excluir
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
