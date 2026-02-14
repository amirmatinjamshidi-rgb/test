import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function classNames(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
