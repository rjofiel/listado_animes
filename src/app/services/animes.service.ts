import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from "graphql-tag";
import { Observable } from "rxjs";
import { Conections } from '../interfaces/conections';

@Injectable({
  providedIn: 'root'
})

export class AnimesService {

  data: any;
  loading:boolean = true;
  error:any;


  res = gql`
  query ($page: Int){
    Page (page:$page perPage:35){
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

  nxPage = gql`
  query ($page: Int){
    Page (page:$page perPage:35){
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

  constructor(private apollo:Apollo) { }

  getData =  (pos:number=1): Observable<any> => {
    return  this.apollo.watchQuery<any>({
      query: this.res,
      variables: {
        id: pos,
      }
    }).valueChanges
  }

  nextPage = (pos:number) => {
    return this.apollo.watchQuery<any>({
      query: this.res,
      variables: {
        id: pos,
      }
    }).valueChanges
  }
}
