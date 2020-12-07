
import { Component, ElementRef, NgModule, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAnime } from '../../interfaces/i-anime';
import { ImgAnime } from '../../interfaces/img-anime';
import { PageInfo } from '../../interfaces/page-info';
import { PagesAnime } from '../../interfaces/pages-anime';
import { QueryVariables } from '../../interfaces/query-variables';
import { AnimesService } from '../../services/animes.service';



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

  @ViewChild('modalAddAnime') modal !: TemplateRef<any>;
  @ViewChild('modalOpened', { read: ViewContainerRef }) opened !: ViewContainerRef;


  public pageInfo: PageInfo = {
    currentPage: 1,
    lastPage: 2,
    hasNextPage: true
  };
  public imgAnimes: ImgAnime = {
    large: '',
    medium: '',
  };
  public Animes: IAnime[] = [{
    id: 0,
    status: '',
    episodes: 0,
    description: '',
    title: {
      romaji: '',
      userPreferred: '',
    },
    mediaListEntry: {
      id: 0,
      status: ''
    },
    coverImage: this.imgAnimes,
  }];
  public ListaPagina: PagesAnime = {
    Page: {
      media: this.Animes,
      pageInfo: this.pageInfo
    }
  };


  ngOnInit() {

    let pagepos = parseInt(this.route.snapshot.params['id']);

    console.log(pagepos)

    let variableQueries = {
      page: pagepos
    }

    this.animeServices.getFilterAnimeFull(variableQueries).subscribe(({ data, loading, error }) => {
      this.ListaPagina = data.Page as PagesAnime,
        this.Animes = data.Page.media as IAnime[],
        this.pageInfo = data.Page.pageInfo as PageInfo,
        this.loading = loading,
        this.error = error;
    }).unsubscribe;

  }

  updatePage(ev: Event, action: string): void {

    ev.preventDefault();

    let current: number = this.pageInfo.currentPage;

    let variableQueries: QueryVariables = {
      page: 1,
      type: "ANIME",
      genres: [],
      isAdult: false,
    }

    switch (action) {

      case 'back':

        current > 1 ? current = current - 1 : current;

        delete variableQueries.genres;

        if (this.textSearch) {
          variableQueries.search = this.textSearch;
          variableQueries.page = current;
        } else {
          variableQueries.page = current;
        }

        this.animeServices.getFilterAnimeFull(variableQueries).subscribe(({ data, loading, error }) => {
          this.ListaPagina = data.Page as PagesAnime,
            this.Animes = data.Page.media as IAnime[],
            this.pageInfo = data.Page.pageInfo as PageInfo,
            this.loading = loading,
            this.error = error

        })

        break
      case 'next':

        this.pageInfo.hasNextPage ? current = this.pageInfo.currentPage + 1 : current;

        delete variableQueries.genres;

        if (this.textSearch) {
          variableQueries.search = this.textSearch;
          variableQueries.page = current;
        } else {
          variableQueries.page = current;
        }


        this.animeServices.getFilterAnimeFull(variableQueries).subscribe(({ data, loading, error }) => {
          this.ListaPagina = data.Page as PagesAnime,
            this.Animes = data.Page.media as IAnime[],
            this.pageInfo = data.Page.pageInfo as PageInfo,
            this.loading = loading,
            this.error = error

        })

        break
    }

    this.ruta.navigate(['/ListadoAnimes/page/', current])
  }

  searchText = (ev: Event): any => {

    ev.preventDefault();

    if (this.textSearch) {

      let variableQueries = {
        search: this.textSearch,
      }

      this.animeServices.getFilterAnimeFull(variableQueries).subscribe(({ data, loading, error }) => {
        this.ListaPagina = data.Page as PagesAnime,
          this.Animes = data.Page.media as IAnime[],
          this.pageInfo = data.Page.pageInfo as PageInfo,
          this.loading = loading,
          this.error = error;
      }).unsubscribe;
    } else {
      this.ngOnInit();
    }

  }



  modalOpen: boolean = false
  selectAnime !: IAnime;

  backdrop: any

  openModal = (e: IAnime) => {

    this.modalOpen = true

    let view = this.modal.createEmbeddedView(null);

    this.opened.insert(view);

    let contenedor = document.getElementById('contenedorAnimes')

    contenedor?.classList.add('fixed-position');



    this.backdrop = document.createElement('DIV');
    this.backdrop.className = 'container-modal';

    this.selectAnime = e;

  }

  close = () => {
    this.opened.clear()
    let contenedor = document.getElementById('contenedorAnimes');
    contenedor?.classList.remove('fixed-position')
    document.body.removeChild(this.backdrop);
  }
}

