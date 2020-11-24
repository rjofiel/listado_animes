import { IAnime } from './i-anime';

export interface Conections {
  Page: IAnime[]
}

export interface AnimeConections{
  anime: IAnime,
  loading: boolean,
  error?:string,
}
