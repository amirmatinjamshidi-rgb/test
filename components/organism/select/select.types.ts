/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";

export type SelectValue = string | number | boolean | object;

export interface SelectOption<T = SelectValue> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface SelectGroup<T = SelectValue> {
  label: string;
  options: SelectOption<T>[];
}

export type SelectProps<TValue = SelectValue> =
  | {
      multiple: true;
      value: TValue[];
      onChange: Dispatch<SetStateAction<TValue[]>>;
      options: Array<SelectOption<TValue>> | Array<SelectGroup<TValue>>;
      searchable?: boolean;
      placeholder?: string;
      closeOnSelect?: boolean;
    }
  | {
      multiple?: false | undefined;
      value: TValue;
      onChange: Dispatch<SetStateAction<TValue>>;
      options: Array<SelectOption<TValue>> | Array<SelectGroup<TValue>>;
      searchable?: boolean;
      placeholder?: string;
      closeOnSelect?: boolean;
    };

export interface UseSelectProps<T = SelectValue> {
  options: Array<SelectOption<T>> | Array<SelectGroup<T>>;
  value?: T | T[];
  defaultValue?: T | T[];
  multiple?: boolean;
  searchable?: boolean;
  closeOnSelect?: boolean;
  onChange?: any;
}

export interface UseSelectReturn<T = SelectValue> {
  value: T | T[];
  setValue: Dispatch<SetStateAction<T | T[]>>;
  selectedOptions: SelectOption<T>[];
  isSelected: (option: SelectOption<T>) => boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredOptions: Array<SelectOption<T>> | Array<SelectGroup<T>>;
  selectAll: () => void;
  clearAll: () => void;
}
