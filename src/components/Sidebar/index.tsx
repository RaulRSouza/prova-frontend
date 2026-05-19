import { useEffect, useState } from "react";

import { Activity, ArrowRight, Moon, Plus, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useMotionValue, useSpring } from "framer-motion";

import { useProdutoStore } from "@/store/useProdutoStore";
import type { StatusProduto } from "@/types/produto";

/* Animated spring counter */
function AnimatedNumber({ value }: { value: number }) {
  const mv = useMotionValue(0);
  const sp = useSpring(mv, { damping: 22, stiffness: 90 });
  const [display, setDisplay] = useState(0);

  useEffect(() => { mv.set(value); }, [value, mv]);
  useEffect(() => sp.on("change", (v) => setDisplay(Math.round(v))), [sp]);

  return <span>{String(display).padStart(2, "0")}</span>;
}

interface KpiItemProps {
  label: string;
  value: number;
  accent?: boolean;
  active?: boolean;
  delay: number;
  onClick: () => void;
}

function KpiItem({ label, value, accent, active, delay, onClick }: KpiItemProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, type: "spring", damping: 22 }}
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={`w-full text-left border-l-2 pl-5 py-4 transition-colors cursor-pointer ${
        active
          ? "border-primary-500 bg-primary-500/5"
          : "border-white/10 dark:border-white/10 border-gray-200 hover:border-primary-400/50"
      }`}
    >
      <p className={`text-xs font-semibold mb-1 ${
        active ? "text-primary-500" : "text-gray-400 dark:text-white/40"
      }`}>
        {label}
      </p>
      <p className={`font-mono text-4xl font-bold tabular-nums leading-none ${
        accent || active ? "text-primary-500 glow-text" : "text-light-text dark:text-dark-text/80"
      }`}>
        <AnimatedNumber value={value} />
      </p>
    </motion.button>
  );
}

interface SidebarProps {
  dark: boolean;
  onToggleTheme: () => void;
  onNovoProduto: () => void;
}

export function Sidebar({ dark, onToggleTheme, onNovoProduto }: SidebarProps) {
  const { produtos, filtros, setFiltros, resetFiltros } = useProdutoStore();

  const total = produtos.length;
  const ativos = produtos.filter((p) => p.status === "Ativo").length;
  const inativos = produtos.filter((p) => p.status === "Inativo").length;

  const activeFilter = filtros.status as string;

  const handleKpi = (status: StatusProduto | "Todos") => {
    if (status === "Todos") {
      resetFiltros();
    } else {
      setFiltros({ ...filtros, status });
    }
  };

  return (
    <aside className="flex flex-col gap-0 lg:sticky lg:top-0 lg:h-screen">
      {/* Brand */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8"
      >
        <img
          src="/logo_ma9.png"
          alt="Grupo ma9"
          className="h-10 w-auto object-contain"
          style={{
            filter:
              "invert(48%) sepia(90%) saturate(400%) hue-rotate(110deg) brightness(0.9)",
          }}
        />
      </motion.div>

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="mb-3 flex items-center gap-2 text-xs font-semibold text-gray-400 dark:text-white/30"
      >
        <Activity className="h-3.5 w-3.5" />
        Indicadores
      </motion.div>

      {/* KPI items */}
      <div className="space-y-1">
        <KpiItem
          label="Total"
          value={total}
          accent
          active={!activeFilter || activeFilter === "Todos"}
          delay={0.1}
          onClick={() => handleKpi("Todos")}
        />
        <KpiItem
          label="Produtos Ativos"
          value={ativos}
          active={activeFilter === "Ativo"}
          delay={0.18}
          onClick={() => handleKpi("Ativo")}
        />
        <KpiItem
          label="Produtos Inativos"
          value={inativos}
          active={activeFilter === "Inativo"}
          delay={0.26}
          onClick={() => handleKpi("Inativo")}
        />
      </div>

      {/* New product button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNovoProduto}
        className="group relative mt-8 flex w-full items-center justify-between overflow-hidden bg-primary-500 px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary-600"
      >
        <motion.span
          animate={{ x: ["-120%", "220%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-y-0 w-1/3 bg-white/20 blur-md"
        />
        <span className="relative flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo produto
        </span>
        <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
      </motion.button>

      {/* Theme toggle */}
      <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onToggleTheme}
          className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:border-primary-400 hover:bg-primary-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-primary-500/50 dark:hover:bg-primary-500/10"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-dark-page">
              {dark
                ? <Sun className="h-4 w-4 text-amber-400" />
                : <Moon className="h-4 w-4 text-indigo-500" />
              }
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-light-text dark:text-dark-text">
                {dark ? "Modo claro" : "Modo escuro"}
              </p>
              <p className="text-xs text-gray-400 dark:text-white/30">
                {dark ? "tema claro" : "tema escuro"}
              </p>
            </div>
          </div>
          <div className={`h-5 w-9 rounded-full transition-colors ${dark ? "bg-primary-500" : "bg-gray-200"}`}>
            <motion.div
              animate={{ x: dark ? 16 : 2 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="mt-0.5 h-4 w-4 rounded-full bg-white shadow"
            />
          </div>
        </motion.button>
      </div>
    </aside>
  );
}
