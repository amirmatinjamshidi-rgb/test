"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll";
import { GameSkeletonCard } from "./GameSkeleton";
import { GameCard } from "@/components/molecule/gameCards";
import type { Game } from "@/Design-System/tokens/game";

interface GamesGalleryProps {
  initialGames: Game[];
}

export function GamesGallery({ initialGames }: GamesGalleryProps) {
  const searchParams = useSearchParams();
  const [games, setGames] = useState<Game[]>(initialGames);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const pageSize = 30;

  const search = searchParams.get("search") || "";
  const genres = searchParams.get("genres") || "";
  const platforms = searchParams.get("platforms") || "";

  const fetchGames = useCallback(
    async (isNextPage: boolean) => {
      if (loading) return;
      setLoading(true);

      const currentPage = isNextPage ? page + 1 : 1;
      try {
        const params = new URLSearchParams();
        params.set("page", String(currentPage));
        params.set("page_size", String(pageSize));
        if (genres) params.set("genres", genres);
        if (platforms) params.set("platforms", platforms);
        if (search) params.set("search", search);

        const res = await fetch(`/api/games?${params.toString()}`);
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();

        setGames((prev) =>
          isNextPage ? [...prev, ...data.results] : data.results,
        );
        setHasMore(Boolean(data.next));
        if (isNextPage) setPage(currentPage);
      } finally {
        setLoading(false);
      }
    },
    [page, genres, platforms, search, loading, pageSize],
  );

  useEffect(() => {
    setGames(initialGames);
    setPage(1);
    setHasMore(true);
  }, [genres, platforms, search, initialGames]);

  const { lastElementRef } = useInfiniteScroll({
    hasMore,
    loading,
    onLoadMore: () => fetchGames(true),
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {games.map((game, index) => (
        <div
          key={`${game.id}-${index}`}
          ref={index === games.length - 1 ? lastElementRef : null}
        >
          <GameCard game={game} />
        </div>
      ))}
      {loading &&
        Array.from({ length: 4 }).map((_, i) => <GameSkeletonCard key={i} />)}
    </div>
  );
}
