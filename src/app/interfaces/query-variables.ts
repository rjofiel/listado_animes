export interface QueryVariables {
  search?: string,
  page: number,
  year?: string,
  isAdult: boolean,
  genres?: string[],
  season?: string,
  status?:string,
  source?:string,
  type: string,
  id_in?: number[],
  [key: string]:string | undefined | boolean | string[] | number | number[]
}

export interface UserAuthenticated {
  id: number,
  name: string
  avatar: {
    medium: string
  }
}
