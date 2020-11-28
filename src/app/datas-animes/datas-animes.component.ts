
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAnime } from '../interfaces/i-anime';
import { ImgAnime } from '../interfaces/img-anime';
import { PageInfo } from '../interfaces/page-info';
import { PagesAnime } from '../interfaces/pages-anime';
import { AnimesService } from '../services/animes.service';


@Component({
  selector: 'app-datas-animes',
  templateUrl: './datas-animes.component.html',
  styleUrls: ['./datas-animes.component.css']
})
export class DatasAnimesComponent implements OnInit {

  loading: boolean = true;
  error: any;

  public textSearch: string = '';

  constructor(private animeServices: AnimesService, private route: ActivatedRoute, private ruta: Router) { }


  public pageInfo : PageInfo = {
    currentPage: 1,
    lastPage: 2
  };

  public imgAnimes: ImgAnime = {
    large: '',
    medium: '',
  }
  public Animes: IAnime[] = [{
    id: 0,
    status: '',
    episodes: 0,
    description: '',
    title: {
      romaji: '',
      userPreferred: '',
    },
    coverImage: this.imgAnimes,
  }];
  public ListaPagina: PagesAnime = {
    Page: {
      media: this.Animes,
      pageInfo: this.pageInfo
    }
  };

  pagepos: number = 0;

  ngOnInit() {
    this.pagepos = parseInt(this.route.snapshot.params['id']);
    this.animeServices.getData(this.pagepos).subscribe(({ data, loading, error }) => {
      this.ListaPagina = data.Page as PagesAnime,
        this.Animes = data.Page.media as IAnime[],
        this.loading = loading,
        this.error = error;
    }).unsubscribe;
  }

  sumPage = (ev: Event): void => {
    this.pagepos++;
    ev.preventDefault();



    this.animeServices.nextPage(this.pagepos).subscribe(({ data, loading, error }) => {
      this.ListaPagina = data.Page as PagesAnime,
        this.Animes = data.Page.media as IAnime[],
        this.loading = loading,
        this.error = error;
      this.ruta.navigate(['/ListadoAnimes/page/', this.pagepos])
    }).unsubscribe;
  }

  minusPage = (ev: Event): void => {
    ev.preventDefault();
    --this.pagepos;
    this.animeServices.nextPage(this.pagepos).subscribe(({ data, loading, error }) => {
      this.ListaPagina = data.Page as PagesAnime,
        this.Animes = data.Page.media as IAnime[],
        this.loading = loading,
        this.error = error;
      this.ruta.navigate(['/ListadoAnimes/page/', this.pagepos])
    }).unsubscribe;
  }

  Animesearch = (ev: Event): void => {
    if (this.textSearch) {
      ev.preventDefault();
      this.animeServices.searchAnime(this.textSearch).subscribe(({ data, loading, error }) => {
        this.ListaPagina = data.Page as PagesAnime,
          this.Animes = data.Page.media as IAnime[],
          this.loading = loading,
          this.error = error;
      }).unsubscribe;
    } else {
      this.ngOnInit();
    }

  }
}



