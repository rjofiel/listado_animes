import { jsDocComment } from '@angular/compiler';
import { Component, EventEmitter, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Generos } from '../interfaces/generos';
import { IAnime } from '../interfaces/i-anime';
import { ImgAnime } from '../interfaces/img-anime';
import { PageInfo } from '../interfaces/page-info';
import { PagesAnime } from '../interfaces/pages-anime';
import { QueryVariables } from '../interfaces/query-variables';
import { SearchImage } from '../interfaces/search-image';
import { AnimesService } from '../services/animes.service';
import { SearchImageService } from '../services/search-image.service';


@Component({
  selector: 'app-searchanime',
  templateUrl: './searchanime.component.html',
  styleUrls: ['./searchanime.component.css']
})
export class SearchanimeComponent implements OnInit {

  selector: string = '.search-results'
  @ViewChild('ModalSearch') ModalSearch!: TemplateRef<any>;
  @ViewChild('vc', { read: ViewContainerRef }) vc!: ViewContainerRef;
  backdrop: any

  @ViewChild('ModalUpdate') ModalUpdate!: TemplateRef<any>;

  public generos!: Generos[];
  public loading: boolean = true;
  public error: any;
  public imgRandom: any;

  public textSearch: string = '';

  variablesQuery!: QueryVariables;


  constructor(private animeService: AnimesService, private searchImage: SearchImageService) {

  }


  public pageInfo: PageInfo = {
    currentPage: 1,
    lastPage: 2,
    hasNextPage: true
  };
  public imgAnimes: ImgAnime = {
    large: '',
    medium: '',
  }
  public Animes: IAnime[] = [{
    id: 0,
    status: '',
    episodes: 0,
    title: {
      romaji: '',
      userPreferred: '',
    },
    mediaListEntry: {
      id:0,
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

  public imageFound!: SearchImage[];

  public AnimesModal: IAnime[] = [{
    id: 0,
    status: '',
    episodes: 0,
    description: '',
    title: {
      romaji: '',
      userPreferred: '',
    },
    mediaListEntry: {
      id:0,
      status: ''
    },

    coverImage: this.imgAnimes,
  }];

  ngOnInit(): void {

    this.animeService.getGenere().subscribe(({ data, loading, error }) => {
      this.generos = data.GenreCollection;
      this.loading = loading
      this.error = error
    })

    this.animeService.getFilterAnimes(this.variablesQuery).subscribe(({ data, loading, error }) => {
      this.ListaPagina = data.Page as PagesAnime,
      this.Animes = data.Page.media as IAnime[],
      this.pageInfo = data.Page.pageInfo as PageInfo;
      this.loading = loading,
      this.error = error;
    })
  }


  searchLucky = async (s: string) => {

    let img = document.querySelector("img");
    this.imgRandom = await this.searchImage.ImageSearch(img, s);
    this.imageFound = this.imgRandom.docs;


    this.openPotentialModal(this.imageFound);

  }


  arrayId!: number[]

  openPotentialModal = (e: SearchImage[])  => {
    let arrayId: number[] = []
    e.forEach((elem) => {
      if(elem.anilist_id){
        arrayId.push(elem.anilist_id);
      }
    })

    this.arrayId = arrayId.filter((el, i)=> arrayId.indexOf(el) === i)

      let view = this.ModalSearch.createEmbeddedView(null);

      view ? this.vc.insert(view) : null;

      let contenedor = document.getElementById('contenedor');
      contenedor?.classList.add('fixed-position');

      this.backdrop = document.createElement('DIV');
      this.backdrop.className = 'container-modal';

      document.body.appendChild(this.backdrop)
  }


  dataModalUpdate!: IAnime;

  openUpdateModal = (e:any) => {

    let view = this.ModalUpdate.createEmbeddedView(null);

    if(view) this.vc.insert(view);

    let contenedor = document.getElementById('contenedor');
    contenedor?.classList.add('fixed-position')

    this.backdrop = document.createElement('DIV')
    this.backdrop.className = 'container-modal';
    document.body.appendChild(this.backdrop)

    this.dataModalUpdate = e;

  }

  updatePage() {

    this.animeService.getFilterAnimes(this.variablesQuery).subscribe(({data, loading, error})=> {
      this.ListaPagina = data.Page as PagesAnime,
      this.Animes = data.Page.media as IAnime[]
      this.pageInfo = data.Page.pageInfo as PageInfo,
      this.loading = loading,
      this.error = error
    }).unsubscribe
  }

  filterNextPage() {

    let estado:boolean;

    this.pageInfo.hasNextPage ?  estado = true: estado=false;

    if(estado=true){
      this.variablesQuery.page = this.pageInfo.currentPage+1

    this.animeService.getFilterAnimes(this.variablesQuery).subscribe(({ data, loading, error }) => {
      this.ListaPagina = data.Page as PagesAnime;
      this.Animes = this.Animes.concat(data.Page.media as IAnime[]),
      this.pageInfo = data.Page.pageInfo as PageInfo;
      this.loading = loading,
      this.error = error;
    })
      }


  }

  statusFilters(e:any){
      this.variablesQuery = e;
      this.updatePage();
  }

  closeModal = () => {
    this.vc.clear();
    let contenedor = document.getElementById('contenedor');
    contenedor?.classList.remove('fixed-position');
    document.body.removeChild(this.backdrop);
  }

 }
