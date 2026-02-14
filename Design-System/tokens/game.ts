export interface Game {
  id: number;
  slug: string;
  name: string;
  background_image: string | null;
  rating: number;
  genres: {
    id: number;
    name: string;
  }[];
}
