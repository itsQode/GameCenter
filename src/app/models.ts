export interface IGame {
  background_image: string;
  name: string;
  id:string;
  released: string;
  metacritic_url: string;
  website: string;
  description: string;
  metacritic: number;
  genres: Array<Gener>;
  parent_platforms: Array<ParentPlatform>;
  publishers: Array<Publishers>;
  ratings: Array<Rating>;
  screenshots: Array<Screenshot>;
  trailers: Trailer[];
}

export interface APIResponse<T> {
  results: Array<T>;
}

interface Gener {
  name: string;
}

interface ParentPlatform {
  platform: {
    name: string;
    slug:string
  };
}

interface Publishers {
  name: string;
}

interface Rating {
  id: number;
  count: number;
  title: string;
}

interface Screenshot {
  image: string;
}

interface Trailer {
  data: {
    max: string;
  };
}
