import { NextResponse } from "next/server";
import gamesData from "@/lib/utils/apiReplaced.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("page_size") || "20");
  const search = searchParams.get("search")?.toLowerCase() || "";
  const genres = searchParams.get("genres")?.toLowerCase().split(",") || [];
  const platforms =
    searchParams.get("platforms")?.toLowerCase().split(",") || [];

  let results = gamesData.results;

  // Filter by search (name)
  if (search) {
    results = results.filter((game) =>
      game.name.toLowerCase().includes(search),
    );
  }

  // Filter by genres
  if (genres.length > 0 && genres[0] !== "") {
    results = results.filter((game) =>
      game.genres.some(
        (g) =>
          genres.includes(g.slug.toLowerCase()) ||
          genres.includes(String(g.id)),
      ),
    );
  }

  // Filter by platforms
  if (platforms.length > 0 && platforms[0] !== "") {
    results = results.filter((game) =>
      game.platforms.some(
        (p) =>
          platforms.includes(p.platform.slug.toLowerCase()) ||
          platforms.includes(String(p.platform.id)),
      ),
    );
  }

  // Pagination
  const total = results.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedResults = results.slice(start, end);

  const buildLink = (targetPage: number) => {
    const params = new URLSearchParams();
    params.set("page", String(targetPage));
    params.set("page_size", String(pageSize));
    if (search) params.set("search", search);
    if (genres.length > 0 && genres[0] !== "")
      params.set("genres", genres.join(","));
    if (platforms.length > 0 && platforms[0] !== "")
      params.set("platforms", platforms.join(","));
    return `/api/games?${params.toString()}`;
  };

  const next = end < total ? buildLink(page + 1) : null;
  const previous = page > 1 ? buildLink(page - 1) : null;

  return NextResponse.json({
    count: total,
    next,
    previous,
    results: paginatedResults,
  });
}
