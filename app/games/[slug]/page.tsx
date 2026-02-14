/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/atom/badge";
import Image from "next/image";
import { Star, Calendar, Globe } from "lucide-react";
import gamesData from "@/lib/utils/apiReplaced.json";
import { notFound } from "next/navigation";

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = gamesData.results.find((g) => g.slug === slug);

  if (!game) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-[65vh] w-full">
        <Image
          src={game.background_image}
          alt={game.name}
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-12 left-0 w-full px-6 lg:px-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {game.genres.map((g: any) => (
              <Badge key={g.id} variant="subtle" colors="primary">
                {g.name}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase mb-4 tracking-tighter">
            {game.name}
          </h1>
          <div className="flex gap-6 text-sm font-bold text-cyan-400">
            <span className="flex items-center gap-2">
              <Star size={16} fill="currentColor" /> {game.rating}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} /> {game.released}
            </span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-500 rounded-full" /> About
            </h2>
            <div
              className="text-gray-400 leading-relaxed prose prose-invert max-w-none"
              // Use a placeholder if description is missing (list data often lacks it)
              dangerouslySetInnerHTML={{ __html: (game as any).description || `<p>No description available for ${game.name}.</p>` }}
            />
          </section>
        </div>

        <aside className="space-y-6">
          <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">
              Information
            </h3>
            <div className="space-y-4">
              <SpecItem
                label="Platforms"
                value={game.platforms
                  .map((p: any) => p.platform.name)
                  .join(", ")}
              />
              <SpecItem label="Publisher" value={(game as any).publishers?.[0]?.name} />
              <SpecItem label="Release Date" value={game.released} />
              {(game as any).website && (
                <a
                  href={(game as any).website}
                  target="_blank"
                  className="flex items-center gap-2 text-sm text-cyan-400 pt-2 hover:underline"
                >
                  <Globe size={14} /> Official Website
                </a>
              )}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[10px] font-bold text-gray-600 uppercase">{label}</p>
      <p className="text-sm font-medium text-gray-200">{value}</p>
    </div>
  );
}
