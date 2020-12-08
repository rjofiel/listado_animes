import { Injectable } from '@angular/core';
import { Apollo, gql, Mutation } from 'apollo-angular';

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
  mutation ($mediaId: Int, $status: MediaListStatus){
    SaveMediaListEntry(mediaId: $mediaId, status: $status){
      id
      status
    }
  }`

  updateList = gql`
  mutation ($id: Int $status: MediaListStatus){
    SaveMediaListEntry(id: $id, status: $status){
      id
      status
    }
  }`

  getList = gql`
    mutation ($id: Int, $status: MediaListStatus){
      SaveMediaListEntry(id: $id, status: $status, ){
        media{
          title{
            romaji
          }
        }
        startedAt{
          year
          month
          day
        }
        completedAt{
          year
          month
          day
        }
        notes
        progress
        status
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

  addAnimeOnUser = (idMedia: number, statusAnime: string = "CURRENT") => {

    return this.apollo.mutate({
      mutation: this.addAnime,
      variables: {
        mediaId: idMedia,
        status: statusAnime
      }
    })
  }


  updataListId = (idList:number, newStatusAnime:string) => {
    return this.apollo.mutate({
      mutation: this.updateList,
      variables: {
        id: idList,
        status: newStatusAnime
      }
    })
  }

  getEntryMedia = (idList: number) => {
    return this.apollo.mutate({
      mutation: this.getList,
      variables: {
        id: idList
      }
    })
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
