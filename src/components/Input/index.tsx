import type { InputHTMLAttributes } from "react";
import type { Control, FieldValues, Path, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

import { cn } from "@/lib/utils";

interface InputProps<T extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  rules?: UseControllerProps<T>["rules"];
}

export function Input<T extends FieldValues>({
  name,
  label,
  control,
  rules,
  className,
  ...props
}: InputProps<T>) {
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
      <input
        id={name}
        {...field}
        {...props}
        className={cn(
          "rounded-none border-b border-gray-200 bg-transparent px-0 py-2 text-sm text-light-text placeholder-gray-300 transition-colors focus:border-primary focus:outline-none dark:border-white/10 dark:text-dark-text dark:placeholder-white/20 dark:focus:border-primary-400",
          error && "border-red-400 focus:border-red-400 focus:ring-red-400/20",
          className
        )}
      />
      {error && (
        <span className="text-xs text-red-500">{error.message}</span>
      )}
    </div>
  );
}
