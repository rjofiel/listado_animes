import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from "graphql-tag";
import { AnimeDetails } from '../interfaces/anime-details';
import { IAnime } from '../interfaces/i-anime';

@Injectable({
  providedIn: 'root'
})

export class AnimesService {

  filterQueryAnime = gql`
  query ($page: Int = 1, $id: Int, $id_in: [Int] , $type: MediaType, $isAdult: Boolean = false, $search: String, $format: [MediaFormat], $status: MediaStatus, $countryOfOrigin: CountryCode, $source: MediaSource, $season: MediaSeason, $year: String, $onList: Boolean, $yearLesser: FuzzyDateInt, $yearGreater: FuzzyDateInt, $episodeLesser: Int, $episodeGreater: Int, $durationLesser: Int, $durationGreater: Int, $chapterLesser: Int, $chapterGreater: Int, $volumeLesser: Int, $volumeGreater: Int, $licensedBy: [String], $genres: [String], $excludedGenres: [String], $tags: [String], $excludedTags: [String], $minimumTagRank: Int, $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]) {
    Page(page: $page, perPage: 20) {
      pageInfo {
        currentPage
        lastPage
        hasNextPage
      }
      media(id: $id, type: $type, id_in:$id_in ,season: $season, format_in: $format, status: $status, countryOfOrigin: $countryOfOrigin, source: $source, search: $search, onList: $onList, startDate_like: $year, startDate_lesser: $yearLesser, startDate_greater: $yearGreater, episodes_lesser: $episodeLesser, episodes_greater: $episodeGreater, duration_lesser: $durationLesser, duration_greater: $durationGreater, chapters_lesser: $chapterLesser, chapters_greater: $chapterGreater, volumes_lesser: $volumeLesser, volumes_greater: $volumeGreater, licensedBy_in: $licensedBy, genre_in: $genres, genre_not_in: $excludedGenres, tag_in: $tags, tag_not_in: $excludedTags, minimumTagRank: $minimumTagRank, sort: $sort, isAdult: $isAdult) {
        id
        status
        title {
          romaji
          userPreferred
        }
        coverImage {
          large
          medium
        }
        season
        type
        averageScore
          }
        }
      }
  `;

  filterQueryDescripcion = gql`
  query ($page: Int = 1, $id: Int, $type: MediaType, $isAdult: Boolean = false, $search: String, $format: [MediaFormat], $status: MediaStatus, $countryOfOrigin: CountryCode, $source: MediaSource, $season: MediaSeason, $year: String, $onList: Boolean, $yearLesser: FuzzyDateInt, $yearGreater: FuzzyDateInt, $episodeLesser: Int, $episodeGreater: Int, $durationLesser: Int, $durationGreater: Int, $chapterLesser: Int, $chapterGreater: Int, $volumeLesser: Int, $volumeGreater: Int, $licensedBy: [String], $genres: [String], $excludedGenres: [String], $tags: [String], $excludedTags: [String], $minimumTagRank: Int, $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]) {
    Page(page: $page, perPage: 20) {
      pageInfo {
        currentPage
        lastPage
        hasNextPage
      }
      media(id: $id, type: $type, season: $season, format_in: $format, status: $status, countryOfOrigin: $countryOfOrigin, source: $source, search: $search, onList: $onList, startDate_like: $year, startDate_lesser: $yearLesser, startDate_greater: $yearGreater, episodes_lesser: $episodeLesser, episodes_greater: $episodeGreater, duration_lesser: $durationLesser, duration_greater: $durationGreater, chapters_lesser: $chapterLesser, chapters_greater: $chapterGreater, volumes_lesser: $volumeLesser, volumes_greater: $volumeGreater, licensedBy_in: $licensedBy, genre_in: $genres, genre_not_in: $excludedGenres, tag_in: $tags, tag_not_in: $excludedTags, minimumTagRank: $minimumTagRank, sort: $sort, isAdult: $isAdult) {
        id
        status
        title {
          romaji
          userPreferred
        }
        coverImage {
          large
          medium
        }
        mediaListEntry {
          id
          status
        }
        description
        season
        type
        averageScore
          }
        }
      }
  `;

  pageQueryDetails = gql`
  query ($StaffLanguage: StaffLanguage = JAPANESE, $id: Int, $type: MediaType, $isAdult: Boolean = false, $search: String, $format: [MediaFormat], $status: MediaStatus, $countryOfOrigin: CountryCode, $source: MediaSource, $season: MediaSeason, $year: String, $onList: Boolean, $yearLesser: FuzzyDateInt, $yearGreater: FuzzyDateInt, $episodeLesser: Int, $episodeGreater: Int, $durationLesser: Int, $durationGreater: Int, $chapterLesser: Int, $chapterGreater: Int, $volumeLesser: Int, $volumeGreater: Int, $licensedBy: [String], $genres: [String], $excludedGenres: [String], $tags: [String], $excludedTags: [String], $minimumTagRank: Int, $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]) {
    Media(id: $id, type: $type, season: $season, format_in: $format, status: $status, countryOfOrigin: $countryOfOrigin, source: $source, search: $search, onList: $onList, startDate_like: $year, startDate_lesser: $yearLesser, startDate_greater: $yearGreater, episodes_lesser: $episodeLesser, episodes_greater: $episodeGreater, duration_lesser: $durationLesser, duration_greater: $durationGreater, chapters_lesser: $chapterLesser, chapters_greater: $chapterGreater, volumes_lesser: $volumeLesser, volumes_greater: $volumeGreater, licensedBy_in: $licensedBy, genre_in: $genres, genre_not_in: $excludedGenres, tag_in: $tags, tag_not_in: $excludedTags, minimumTagRank: $minimumTagRank, sort: $sort, isAdult: $isAdult) {
      id
      title {
        romaji
        userPreferred
      }
      coverImage {
        large
        medium
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
    externalLinks {
      id
      url
      site
    }
    trailer {
      id
      site
      thumbnail
    }
      description
      bannerImage
      season
      type
      format
      status
      episodes
      duration
      genres
      isAdult
      averageScore
      popularity
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }

      characters {
        edges {
          role
          id
          node {
            name {
              full
              native
            }
            image {
              medium
            }
            description
          }
          voiceActors(language: $StaffLanguage) {
            name {
              full
              native
            }
            image {
              medium
            }
          }
        }
      }

      studios{
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
  `;

  generos = gql`
  query {
    GenreCollection
  }`;

  queryModal = gql`
  query ($id_in: [Int], $isAdult: Boolean) {
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

  searchModal = (id: number[], isAdult: boolean = false) => {

    return this.apollo.watchQuery<any>({

      query: this.queryModal,
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

  getFilterAnimes = (obj: object) => {
    return this.apollo.watchQuery<any>({
      query: this.filterQueryAnime,
      variables: obj
    }).valueChanges
  }

  getFilterAnimeFull = (obj: object) => {
    return this.apollo.watchQuery<any>({
      query: this.filterQueryDescripcion,

      variables: obj
    }).valueChanges
  }

  getDetailAnime = (obj: object) => {
    return this.apollo.watchQuery<any>({
      query: this.pageQueryDetails,
      variables: obj
    }).valueChanges
  }

  fixDescription(obj: AnimeDetails | IAnime){
    let copyObject: AnimeDetails | IAnime = {
      ...obj
    }
    copyObject.description = obj.description?.replace(/<br>/gi, '\n');

    return obj = {
      ...copyObject
    }
  }

  auto = gql`
  query{
    Viewer{
      id
      name
    }
  }`

  getToken = () =>{
    return this.apollo.watchQuery<any>({
      query: this.auto
    }).valueChanges
  }


}
