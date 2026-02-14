import { GamesGallery } from "@/components/organism/game/GameGalley";
import { colorTokens, typographyTokens } from "@/Design-System/tokens";
import gamesData from "@/lib/utils/apiReplaced.json";

export default async function GamesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  
  const search = (Array.isArray(resolvedSearchParams.search) ? resolvedSearchParams.search[0] : resolvedSearchParams.search)?.toLowerCase() || "";
  const genres = (Array.isArray(resolvedSearchParams.genres) ? resolvedSearchParams.genres[0] : resolvedSearchParams.genres)?.toLowerCase().split(",") || [];
  const platforms = (Array.isArray(resolvedSearchParams.platforms) ? resolvedSearchParams.platforms[0] : resolvedSearchParams.platforms)?.toLowerCase().split(",") || [];

  let results = gamesData.results;


  if (search) {
    results = results.filter((game) =>
      game.name.toLowerCase().includes(search)
    );
  }


  if (genres.length > 0 && genres[0] !== "") {
    results = results.filter((game) =>
      game.genres.some((g) => genres.includes(g.slug.toLowerCase()) || genres.includes(String(g.id)))
    );
  }


  if (platforms.length > 0 && platforms[0] !== "") {
    results = results.filter((game) =>
      game.platforms.some((p) => 
        platforms.includes(p.platform.slug.toLowerCase()) || 
        platforms.includes(String(p.platform.id))
      )
    );
  }

 
  const initialResults = results.slice(0, 30);

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className={typographyTokens.heading}>Browse Games</h1>
        <p className={colorTokens.text.secondary}>
          Discover your next favorite title
        </p>
      </header>

      <GamesGallery initialGames={initialResults} />
    </main>
  );
}
