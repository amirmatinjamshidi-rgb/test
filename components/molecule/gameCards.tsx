import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { radiusTokens, colorTokens } from "@/Design-System/tokens";
import type { Game } from "@/Design-System/tokens/game";

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <Link
      href={`/games/${game.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
    >
      <article
        className={`
          relative overflow-hidden
          ${radiusTokens.lg}
          ${colorTokens.background.darkCard}
          transition-all duration-300
          hover:scale-[1.02]
          hover:shadow-xl
        `}
      >
        <div className="relative aspect-video">
          <Image
            src={game.background_image ?? "/placeholder.jpg"}
            alt={game.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-90" />
        </div>

        <div className="absolute bottom-0 w-full p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`
                ${colorTokens.text.light}
                font-semibold
                text-sm sm:text-base
                truncate
              `}
            >
              {game.name}
            </h3>

            <div className="flex items-center gap-1 text-yellow-400 text-xs sm:text-sm">
              <Star size={14} className="fill-yellow-400" />
              <span>{game.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {game.genres.slice(0, 2).map((genre) => (
              <span
                key={genre.id}
                className={`
                  text-[10px] sm:text-xs
                  px-2 py-0.5
                  ${radiusTokens.full}
                  bg-white/10
                  text-gray-300
                  backdrop-blur
                `}
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
};
