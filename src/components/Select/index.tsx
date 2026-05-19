import type { SelectHTMLAttributes } from "react";
import type { Control, FieldValues, Path, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps<T extends FieldValues>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "name"> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  options: SelectOption[];
  placeholder?: string;
  rules?: UseControllerProps<T>["rules"];
}

export function Select<T extends FieldValues>({
  name,
  label,
  control,
  options,
  placeholder,
  rules,
  className,
  ...props
}: SelectProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-white/40"
      >
        {label}
        {props.required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <select
        id={name}
        {...field}
        className={cn(
          "rounded-none border-b border-gray-200 bg-transparent px-0 py-2 text-sm text-light-text transition-colors focus:border-primary focus:outline-none appearance-none dark:border-white/10 dark:text-dark-text dark:bg-transparent dark:focus:border-primary-400",
          error && "border-red-400 focus:border-red-400 focus:ring-red-400/20",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs text-red-500">{error.message}</span>
      )}
    </div>
  );
}
