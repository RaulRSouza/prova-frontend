import { useForm } from "react-hook-form";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";

import { useProdutoStore } from "@/store/useProdutoStore";
import { CATEGORIAS } from "@/types/produto";
import type { FiltroProduto } from "@/types/produto";

const categoriaOptions = [
  ...CATEGORIAS.map((c) => ({ value: c, label: c })),
];

const statusOptions = [
  { value: "Ativo", label: "Ativo" },
  { value: "Inativo", label: "Inativo" },
];

export function FiltroBar() {
  const { setFiltros, resetFiltros } = useProdutoStore();

  const { control, handleSubmit, reset } = useForm<FiltroProduto>({
    defaultValues: {
      categoria: "",
      precoMin: "",
      precoMax: "",
      status: "Todos",
    },
  });

  const onSubmit = (data: FiltroProduto) => {
    setFiltros(data);
  };

  const handleLimpar = () => {
    reset();
    resetFiltros();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap items-end gap-3 border border-gray-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-white/5 dark:bg-dark-card/60"
    >
      <div className="w-44">
        <Select
          name="categoria"
          label="Categoria"
          control={control}
          options={categoriaOptions}
          placeholder="Todas"
        />
      </div>

      <div className="w-32">
        <Input
          name="precoMin"
          label="Preço mín."
          type="number"
          min={0}
          placeholder="0"
          control={control}
        />
      </div>

      <div className="w-32">
        <Input
          name="precoMax"
          label="Preço máx."
          type="number"
          min={0}
          placeholder="9999"
          control={control}
        />
      </div>

      <div className="w-36">
        <Select
          name="status"
          label="Status"
          control={control}
          options={statusOptions}
          placeholder="Todos"
        />
      </div>

      <div className="flex gap-2 pb-0.5">
        <Button type="submit" variant="primary">
          Filtrar
        </Button>
        <Button type="button" variant="outline" onClick={handleLimpar}>
          Limpar
        </Button>
      </div>
    </form>
  );
}
