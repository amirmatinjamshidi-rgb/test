/* eslint-disable react-hooks/incompatible-library */
"use client";

import * as React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { SelectOption, SelectGroup } from "./select.types";
import { classNames } from "@/lib/utils/cn";
import { colorTokens } from "@/Design-System/tokens";
import { typographyTokens } from "@/Design-System/tokens";
import { spacingTokens } from "@/Design-System/tokens";
import { radiusTokens } from "@/Design-System/tokens";

type SelectProps<T> =
  | {
    options: Array<SelectOption<T> | SelectGroup<T>>;
    placeholder?: string;
    multiple: true;
    searchable?: boolean;
    value?: T[];
    onChange?: React.Dispatch<React.SetStateAction<T[]>>;
  }
  | {
    options: Array<SelectOption<T> | SelectGroup<T>>;
    placeholder?: string;
    multiple?: false | undefined;
    searchable?: boolean;
    value?: T;
    onChange?: React.Dispatch<React.SetStateAction<T>>;
  };

export function Select<T extends string | number | object>({
  options,
  placeholder = "Select...",
  multiple = true,
  searchable = false,
  value,
  onChange,
}: SelectProps<T>) {
  const [internalValue, setInternalValue] = React.useState<T | T[] | undefined>(
    undefined,
  );
  const selectedValue = value ?? internalValue;

  const setValue = (val: T | T[]) => {
    if (multiple) {
      const next = (Array.isArray(val) ? val : [val]) as T[];
      if (onChange) {
        (onChange as React.Dispatch<React.SetStateAction<T[]>>)(next);
      } else {
        setInternalValue(next);
      }
      return;
    }

    const next = (Array.isArray(val) ? (val[0] as T) : val) as T;
    if (onChange) {
      (onChange as React.Dispatch<React.SetStateAction<T>>)(next);
    } else {
      setInternalValue(next);
    }
  };

  const [searchTerm, setSearchTerm] = React.useState("");

  const flatOptions: SelectOption<T>[] = React.useMemo(() => {
    const flattened: SelectOption<T>[] = [];
    options.forEach((opt) => {
      if ("options" in opt) flattened.push(...opt.options);
      else flattened.push(opt);
    });
    return flattened;
  }, [options]);

  const filteredOptions = React.useMemo(() => {
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

  const virtualItemsList = React.useMemo(() => {
    const items: Array<
      | { type: "header"; label: string }
      | { type: "option"; option: SelectOption<T> }
    > = [];
    filteredOptions.forEach((optOrGroup) => {
      if ("options" in optOrGroup) {
        if (optOrGroup.label) {
          items.push({ type: "header", label: optOrGroup.label });
        }
        optOrGroup.options.forEach((opt) => {
          items.push({ type: "option", option: opt });
        });
      } else {
        items.push({ type: "option", option: optOrGroup as SelectOption<T> });
      }
    });
    return items;
  }, [filteredOptions]);

  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: virtualItemsList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 36,
    overscan: 5,
  });

  const selectedOptions = React.useMemo(() => {
    if (multiple) {
      const vals = Array.isArray(selectedValue) ? selectedValue : [];
      return flatOptions.filter((opt) => vals.includes(opt.value));
    } else {
      return flatOptions.filter((opt) => opt.value === selectedValue);
    }
  }, [flatOptions, selectedValue, multiple]);

  const isSelected = (opt: SelectOption<T>) => {
    if (multiple) {
      const vals = Array.isArray(selectedValue) ? selectedValue : [];
      return vals.includes(opt.value);
    }
    return selectedValue === opt.value;
  };

  const selectAll = () => {
    if (!multiple) return;
    const values = flatOptions
      .filter((opt) => !opt.disabled)
      .map((opt) => opt.value) as T[];
    setValue(values);
  };

  const clearAll = () => {
    setValue(multiple ? ([] as T[]) : ([] as unknown as T));
  };

  return (
    <Listbox
      value={selectedValue}
      onChange={setValue}
      multiple={multiple}
    >
      {({ open }) => (
        <div className="relative w-full">
          <Listbox.Button
            className={classNames(
              "flex justify-between items-center w-full transition border border-cyan-200",
              colorTokens.border.focus,
              radiusTokens.md,
              spacingTokens.sm,
              typographyTokens.body,
              "hover:" + colorTokens.border.base,
            )}
          >
            <span className="truncate text-amber-50">
              {multiple
                ? `${selectedOptions.length} selected`
                : (selectedOptions[0]?.label ?? placeholder)}
            </span>
            <ChevronsUpDown className="w-5 h-5 text-gray-400" />
          </Listbox.Button>

          <Transition
            show={open}
            as={React.Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Listbox.Options
              static
              as="div"
              ref={(node) => {
                parentRef.current = node as HTMLDivElement | null;
                if (node) {
                  requestAnimationFrame(() => {
                    rowVirtualizer.measure();
                  });
                }
              }}
              className={classNames(
                "absolute mt-1 w-full max-h-72 overflow-auto z-50 border",
                radiusTokens.md,
                colorTokens.background.base,
                colorTokens.border.base,
              )}
            >
              {searchable && (
                <div className="sticky top-0 z-10 bg-inherit">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={classNames(
                      "w-full outline-none border-b",
                      spacingTokens.sm,
                      typographyTokens.body,
                      "bg-transparent",
                    )}
                  />
                </div>
              )}

              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  width: "100%",
                  position: "relative",
                }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const item = virtualItemsList[virtualRow.index];
                  return (
                    <div
                      key={virtualRow.key}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      {item.type === "header" ? (
                        <div
                          className={classNames(
                            typographyTokens.caption,
                            colorTokens.text.secondary,
                            spacingTokens.xs,
                            "px-2 bg-gray-50/5",
                          )}
                        >
                          {item.label}
                        </div>
                      ) : (
                        <Listbox.Option
                          value={item.option.value}
                          disabled={item.option.disabled}
                          className={({ active, selected }) =>
                            classNames(
                              "cursor-pointer flex justify-between items-center text-sm px-2 py-1 rounded-md h-full",
                              active && colorTokens.background.hover,
                              selected &&
                              colorTokens.background.selected +
                              " font-semibold",
                            )
                          }
                        >
                          <span>{item.option.label}</span>
                          {isSelected(item.option) && (
                            <Check className="w-4 h-4 text-cyan-600" />
                          )}
                        </Listbox.Option>
                      )}
                    </div>
                  );
                })}
              </div>

              {multiple && (
                <div className="sticky bottom-0 flex justify-between p-2 border-t text-sm bg-inherit">
                  <button
                    type="button"
                    className={colorTokens.text.accent}
                    onClick={selectAll}
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    className={colorTokens.text.danger}
                    onClick={clearAll}
                  >
                    Clear
                  </button>
                </div>
              )}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
