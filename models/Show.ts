export interface Show {
  title?: string;
  name?: string;
  overview: string;
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  vote_count: number;
  original_language: string;
  original_title: string;
  poster_path: string;
  video: boolean;
  vote_average: number;
  release_date: string;
  popularity: number;
  media_type: 'tv' | 'movie';
  first_air_date: string;
}
