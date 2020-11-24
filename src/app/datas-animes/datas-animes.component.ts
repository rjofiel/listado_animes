
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  pagepos=1

  constructor(private animeServices: AnimesService) { }

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
    }
  };


  ngOnInit() {
    this.animeServices.getData(this.pagepos).subscribe(({ data, loading, error }) => {
      this.ListaPagina = data.Page as PagesAnime,
      this.Animes = data.Page.media as IAnime[],
      this.loading = loading,
      this.error = error;
    });
  }


}



