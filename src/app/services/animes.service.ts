import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from "graphql-tag";
import { type } from 'os';
import { Observable } from "rxjs";
import { Conections } from '../interfaces/conections';

@Injectable({
  providedIn: 'root'
})

export class AnimesService {

  data: any;
  loading: boolean = true;
  error: any;

  res = gql`
  query ($page: Int){
    Page (page:$page perPage:20){
      media(type:ANIME, sort:ID) {
        id
        title {
          romaji
          userPreferred
        }
        status
        episodes
        coverImage {
          large
          medium
        }
        description
      }
    }
  }`;

  resAdv = gql`
  query ($page: Int){
    Page (page:$page perPage:20){
      media(type:ANIME, sort:ID) {
        id
        title {
          romaji
          userPreferred
        }
        status
        episodes
        coverImage {
          large
          medium
        }
      }
    }
  }`;

  nxPage = gql`
  query ($page: Int){
    Page (page:$page perPage:40){
      media(type:ANIME, sort:ID) {
        id
        title {
          romaji
          userPreferred
        }
        status
        episodes
        coverImage {
          large
          medium
        }
        description
      }
    }
  }`;


  search = gql`
  query ( $search: String) {
    Page( perPage: 20) {
      media( type: ANIME, search:$search) {
        id
        title {
          romaji
          userPreferred
        }
        status
        coverImage {
          large
          medium
        }
        description
      }
    }
  }`

  searchAdv = gql`
  query ($page: Int = 1, $id: Int, $type: MediaType, $isAdult: Boolean = false, $search: String, $format: [MediaFormat], $status: MediaStatus, $countryOfOrigin: CountryCode, $source: MediaSource, $season: MediaSeason, $year: String, $onList: Boolean, $yearLesser: FuzzyDateInt, $yearGreater: FuzzyDateInt, $episodeLesser: Int, $episodeGreater: Int, $durationLesser: Int, $durationGreater: Int, $chapterLesser: Int, $chapterGreater: Int, $volumeLesser: Int, $volumeGreater: Int, $licensedBy: [String], $genres: [String], $excludedGenres: [String], $tags: [String], $excludedTags: [String], $minimumTagRank: Int, $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]) {
    Page(page: $page, perPage: 20) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(id: $id, type: $type, season: $season, format_in: $format, status: $status, countryOfOrigin: $countryOfOrigin, source: $source, search: $search, onList: $onList, startDate_like: $year, startDate_lesser: $yearLesser, startDate_greater: $yearGreater, episodes_lesser: $episodeLesser, episodes_greater: $episodeGreater, duration_lesser: $durationLesser, duration_greater: $durationGreater, chapters_lesser: $chapterLesser, chapters_greater: $chapterGreater, volumes_lesser: $volumeLesser, volumes_greater: $volumeGreater, licensedBy_in: $licensedBy, genre_in: $genres, genre_not_in: $excludedGenres, tag_in: $tags, tag_not_in: $excludedTags, minimumTagRank: $minimumTagRank, sort: $sort, isAdult: $isAdult) {
        id
        title {
          romaji
          userPreferred
        }
        coverImage {
          extraLarge
          large
          color
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        bannerImage
        season
        type
        format
        status(version: 2)
        episodes
        duration
        chapters
        volumes
        genres
        isAdult
        averageScore
        popularity
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
        mediaListEntry {
          id
          status
        }
        studios(isMain: true) {
          edges {
            isMain
            node {
              id
              name
            }
          }
        }
      }
    }
  }`;

  generos = gql`
  query {
    GenreCollection
  }`;

  searchMa = gql`query ($id_in: [Int], $isAdult: Boolean) {
    Page{
        media(id_in: $id_in, isAdult: $isAdult) {
      id
      status
      episodes
      title {
        romaji
        userPreferred
      }
      coverImage {
        large
        medium
      }
    }
    }
  }
    `;
  constructor(private apollo: Apollo) { }

  getData = (pos: number = 1): Observable<any> => {
    return this.apollo.watchQuery<any>({
      query: this.res,
      variables: {
        page: pos,
      }
    }).valueChanges
  }

  nextPage = (pos: number) => {
    return this.apollo.watchQuery<any>({
      query: this.nxPage,
      variables: {
        page: pos,
      }
    }).valueChanges
  }

  searchAnime = (search: string, pos?: number) => {

    return this.apollo.watchQuery<any>({
      query: this.search,
      variables: {
        search: search,
        page: pos
      }
    }).valueChanges
  }

  getDataAdv = (pos: number = 1): Observable<any> => {
    return this.apollo.watchQuery<any>({
      query: this.resAdv,
      variables: {
        page: pos,
      }
    }).valueChanges
  }

  searchAdvanced = (srch: string, pos: number = 1, year?: string, isAdult: boolean = false, genero?: string, season?: string, status?: string, src?: string) => {
    return this.apollo.watchQuery<any>({
      query: this.searchAdv,
      variables: {
        search: srch,
        page: pos,
        isAdult: isAdult
      }
    }).valueChanges
  }

  searchModal = (id: number[], isAdult: boolean = false) => {

    return this.apollo.watchQuery<any>({
      query: this.searchMa,
      variables: {
        id_in: id,
        isAdult: isAdult,
      }
    }).valueChanges
  }

  getGenere = () => {
    return this.apollo.watchQuery<any>({
      query: this.generos,
    }).valueChanges
  }
}
