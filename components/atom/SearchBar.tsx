"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { colorTokens, radiusTokens } from "@/Design-System/tokens";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }
      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, router, searchParams]);

  return (
    <div className="relative w-full max-w-md">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        size={18}
      />
      <input
        type="text"
        placeholder="Search 800,000+ games..."
        className={`w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 ${colorTokens.text.light} ${radiusTokens.md} focus:outline-none focus:border-cyan-500 transition-colors`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
