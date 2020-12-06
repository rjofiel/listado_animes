import { ImgAnime } from './img-anime';

export interface IAnime {
  id:number,
  status: string,
  episodes:number,
  description?:string,
  title: {
    romaji:string,
    userPreferred:string,
  },
  mediaListEntry?: {
    id:number,
    status: string
  },
  coverImage:ImgAnime,
}
