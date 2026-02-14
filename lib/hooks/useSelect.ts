/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { useState, useMemo } from "react";
import type {
  SelectOption,
  UseSelectProps,
  UseSelectReturn,
} from "@/components/organism/select/select.types";

export function useSelect<T = string>({
  options,
  value,
  defaultValue,
  onChange,
  multiple = false,
  searchable = false,
}: UseSelectProps<T>): UseSelectReturn<T> {
  const [internalValue, setInternalValue] = useState<T | T[]>(
    defaultValue !== undefined
      ? defaultValue
      : multiple
        ? []
        : ([] as unknown as T),
  );

  const isControlled = value !== undefined;
  const selectedValue: T | T[] = isControlled ? value! : internalValue;

  const [searchTerm, setSearchTerm] = useState("");

  const setValue = (val: T | T[] | ((prev: T | T[]) => T | T[])) => {
    const next =
      typeof val === "function" ? (val as Function)(selectedValue) : val;

    if (!isControlled) setInternalValue(next as T | T[]);
    onChange?.(next as T | T[]);
  };

  const flatOptions: SelectOption<T>[] = useMemo(() => {
    const flattened: SelectOption<T>[] = [];
    options.forEach((opt) => {
      if ("options" in opt) flattened.push(...opt.options);
      else flattened.push(opt);
    });
    return flattened;
  }, [options]);

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm) return options;

    const lower = searchTerm.toLowerCase();
    return options
      .map((opt) => {
        if ("options" in opt) {
          const filtered = opt.options.filter((o) =>
            o.label.toLowerCase().includes(lower),
          );
          return { ...opt, options: filtered };
        } else if (opt.label.toLowerCase().includes(lower)) return opt;
        return null;
      })
      .filter(Boolean) as typeof options;
  }, [options, searchTerm, searchable]);

  const selectedOptions = useMemo(() => {
    if (multiple) {
      const vals = Array.isArray(selectedValue) ? selectedValue : [];
      return flatOptions.filter((opt) => vals.includes(opt.value));
    } else {
      return flatOptions.filter((opt) => opt.value === selectedValue);
    }
  }, [flatOptions, selectedValue, multiple]);

  const isSelected = (option: SelectOption<T>) => {
    if (multiple) {
      const vals = Array.isArray(selectedValue) ? selectedValue : [];
      return vals.includes(option.value);
    }
    return selectedValue === option.value;
  };

  const selectAll = () => {
    if (multiple) setValue(flatOptions.map((opt) => opt.value) as T[]);
  };

  const clearAll = () => {
    if (multiple) setValue([] as T[]);
    else setValue(flatOptions[0]?.value as T);
  };

  return {
    value: selectedValue,
    setValue,
    selectedOptions,
    isSelected,
    searchTerm,
    setSearchTerm,
    filteredOptions,
    selectAll,
    clearAll,
  };
}
