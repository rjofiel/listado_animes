import { Component } from '@angular/core';
import { IAnime } from './interfaces/i-anime';
import { PagesAnime } from './interfaces/pages-anime';
import { AnimesService } from './services/animes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'anime-list';


  pagepos: number = 1;
  ListaPagina: any;
  Animes: any[] = [];
  error: any;
  loading: boolean | undefined;

constructor (private animeServices: AnimesService ){}

  sumPage = (ev:Event):void => {
    ev.preventDefault();
    this.animeServices.nextPage(++this.pagepos).subscribe(({ data, loading, error }) => {
      this.ListaPagina = data.Page as PagesAnime,
      this.Animes = data.Page.media as IAnime[],
      this.loading = loading,
      this.error = error;
    });
  }
}
