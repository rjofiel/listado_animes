import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailThisService {

constructor(private http: HttpClient) { }

emailApi: string = "https://mailthis.to/EntryAnime"

  mailThis(bodyMail: object){
  return this.http.post(this.emailApi, bodyMail, {responseType: 'text'})
  }
}
