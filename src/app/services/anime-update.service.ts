import { Injectable } from '@angular/core';
import { Apollo, gql, Mutation } from 'apollo-angular';
import { fuzzyDate } from '../interfaces/anime-details';

@Injectable({
  providedIn: 'root'
})
export class AnimeUpdateService {

  constructor(private apollo: Apollo) { }


  userViewer = gql`
  query{
    Viewer{
          id
          name
    }
  }`

  addAnime = gql`
  mutation ($mediaId: Int, $status: MediaListStatus, $progress:Int, $notes:String, $startedAt:FuzzyDateInput, $completedAt:FuzzyDateInput){
    SaveMediaListEntry(mediaId: $mediaId, status: $status, progress:$progress, notes:$notes, startedAt:$startedAt, completedAt: $completedAt){
      id
      status
    }
  }`

  updateList = gql`
  mutation ($id: Int, $status: MediaListStatus, $progress:Int, $notes:String, $startedAt:FuzzyDateInput, $completedAt:FuzzyDateInput){
    SaveMediaListEntry(id: $id, status: $status, progress:$progress, notes:$notes, startedAt:$startedAt, completedAt: $completedAt){
      id
    }
  }`

  getList = gql`
  query ($id: Int){
    MediaList (id:$id){
      media{
        title{
          romaji
        }
      }
      id
      user{
        name
      }
      status
      progress
      notes
      startedAt{
        day
        month
        year
      }
      completedAt{
        day
        month
        year
      }
    }
  }
  `;


  deleteListMedia =  gql`
  mutation ($id: Int){
      DeleteMediaListEntry (id:$id){
        deleted
      }
    }
  `


  getUserViewer = () => {
    return this.apollo.watchQuery<any>({
      query: this.userViewer
    })
  }

  addAnimeOnUser = (idMedia: number, newStatusAnime:string, progress: number, notes: string, startedAt: fuzzyDate, completedAt: fuzzyDate ) => {

    return this.apollo.mutate({
      mutation: this.addAnime,
      variables: {
        mediaId: idMedia,
        status: newStatusAnime,
        progress: progress,
        notes: notes,
        startedAt: {
          day: startedAt.day,
          month: startedAt.month,
          year: startedAt.year
        },
        completedAt:  {
          day: completedAt.day,
          month: completedAt.month,
          year: completedAt.year
        },
      }
    })
  }

  updateListId = (idList:number, newStatusAnime:string, progress: number, notes: string, startedAt: fuzzyDate, completedAt: fuzzyDate  ) => {

    return this.apollo.mutate({
      mutation: this.updateList,
      variables: {
        id: idList,
        status: newStatusAnime,
        progress: progress,
        notes: notes,
        startedAt: {
          day: startedAt.day,
          month: startedAt.month,
          year: startedAt.year
        },
        completedAt:  {
          day: completedAt.day,
          month: completedAt.month,
          year: completedAt.year
        },
      }
    })
  }

  getEntryMedia = (idList: number) => {
    return this.apollo.watchQuery<any>({
      query: this.getList,
      variables: {
        id: idList
      }
    }).valueChanges
  }

  deleteEntryMedia = (idList: number) => {
    return this.apollo.mutate({
      mutation: this.deleteListMedia,
      variables: {
        id: idList
      }
    })
  }
}
