export interface MediaListEntry {
  media: {
    title: {
      romaji: string
    },
  }
  id:number
  user:{
    name:string
  }
  status: string
  notes: string
  progress: number,

  startedAt: {
    day: string,
    month: string,
    year: string
  },
  completedAt: {
    day: string,
    month: string,
    year: string
  },
}
