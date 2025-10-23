export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  backdrop_path: string;
  runtime: number;
  overview: string;
  original_title: string;
  original_language:string;
}


export interface CastMember{
  name: string;
  character: string;
}
export interface CrewMember {
  job: string;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Language {
  iso_639_1: string;
  english_name: string;
}
