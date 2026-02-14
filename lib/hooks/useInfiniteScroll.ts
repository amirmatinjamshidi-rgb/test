"use client";

import { useRef, useCallback } from "react";

interface UseInfiniteScrollProps {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}

export function useInfiniteScroll({
  hasMore,
  loading,
  onLoadMore,
}: UseInfiniteScrollProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, onLoadMore],
  );

  return { lastElementRef };
}
