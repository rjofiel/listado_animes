import { ImgAnime } from './pages-anime';

export interface AnimeDetails {
  id:number,
  title: {
    romaji:string,
    userPreferred:string,
  },
  status: string,
  episodes:number,
  description:string,
  bannerImage: string,
  season: string,
  type: string,
  format: string,
  duration: number,
  genres: string[],
  isAdult: boolean,
  averageScore: number,
  characters: {
    edges: infoCast[]
  },
  mediaListEntry?:{
    id: number,
    status: string,
  },
  coverImage:ImgAnime,
  externalLinks: [{
    id: number,
    url: string,
    site: string
  }],
  trailer: {
    id:string,
    site: string,
    thumbnail: string
  },
  startDate:fuzzyDate
  endDate:fuzzyDate,
  nextAiringEpisode: {
    airingAt:number,
    timeUntilAiring:number,
    episode: number
  },
  studios: {
    edges:[ {
      isMain: true,
      node:{
        name: string
      }
    }]
  }
}

export interface fuzzyDate {
  year: number,
  month: number,
  day: number
}


export interface infoCast {
  role: string,
  node: character,
  voiceActors: voiceActor[]
}

export interface character {
    name: {
      full: string,
      native: string,
    },
    image:{
      medium:string
    },
    description: string
}

export interface voiceActor {
    name:{
      full: string,
      native: string
    },
    image:{
      medium:string
    }
}
