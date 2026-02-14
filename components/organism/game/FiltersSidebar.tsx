"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function FiltersSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <aside className="hidden lg:block sticky top-24 h-fit bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">Filters</h3>

      <button
        onClick={() => updateFilter("platform", "pc")}
        className="block text-gray-300 hover:text-white mb-2"
      >
        PC
      </button>

      <button
        onClick={() => updateFilter("platform", "playstation")}
        className="block text-gray-300 hover:text-white"
      >
        PlayStation
      </button>
    </aside>
  );
}
