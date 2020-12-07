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
  getUserViewer = () => {
    return this.apollo.watchQuery<any>({
      query: this.userViewer
    })
  }

  addAnimeOnUser = (idMedia: number = 1, statusAnime: string = "CURRENT") => {

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
}
