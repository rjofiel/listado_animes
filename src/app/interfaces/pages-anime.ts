export interface PagesAnime {
  Page:{
    media: IAnime[],
    pageInfo: PageInfo
  }
}

export interface IAnime {
  id:number,
  status: string,
  episodes:number,
  description:string,
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

export interface PageInfo {
  currentPage: number,
  lastPage:number,
  hasNextPage: boolean
}

export interface ImgAnime {
  large:string,
  medium:string,
}

