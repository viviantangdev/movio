export interface Movie {
  id: number;
}

export interface MovieData extends Movie {
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
  original_title: string;
  original_language: string;
  genres: Genre[];
  runtime: number;
}

export interface CastMember {
  name: string;
  character: string;
  profile_path: string;
}
export interface CrewMember {
  job: string;
  name: string;
  profile_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Language {
  iso_639_1: string;
  english_name: string;
}

export interface Video {
  id: string;
  key: string;
  site: string;
  type: string;
  official: boolean;
}
