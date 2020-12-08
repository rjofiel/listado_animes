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
    edges: [{
      role: string,
      node: {
        name: {
          full: string,
          native: string,
        },
        image:{
          medium:string
        },
        description: string
      },
      voiceActors: [{
        name:{
          full: string,
          native: string
        },
        image:{
          medium:string
        }
      }]
    }]
  },
  mediaListEntry?:{
    id: number,
    status: string,
  },
  coverImage:{
    large: string,
    medium: string
  },
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
  startDate:{
    year: number,
    month: number,
    day: number
  }
  endDate:{
    year: number,
    month: number,
    day: number
  }
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
