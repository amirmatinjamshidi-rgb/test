"use client";

import { useRouter, useSearchParams } from "next/navigation";

const GENRES = [
  { id: "action", name: "Action" },
  { id: "indie", name: "Indie" },
  { id: "adventure", name: "Adventure" },
  { id: "role-playing-games-rpg", name: "RPG" },
  { id: "shooter", name: "Shooter" },
];

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeGenre = searchParams.get("genres");

  const handleFilter = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (activeGenre === slug) {
      params.delete("genres");
    } else {
      params.set("genres", slug);
    }

    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <aside className="w-64 hidden lg:block space-y-8">
      <div>
        <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">
          Genres
        </h3>
        <ul className="space-y-2">
          {GENRES.map((genre) => (
            <li key={genre.id}>
              <button
                onClick={() => handleFilter(genre.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                  activeGenre === genre.id
                    ? "bg-cyan-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {genre.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
