import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
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
  @ViewChild('ModalSearch')
  ModalSearch!: TemplateRef<any>;
  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef | undefined;
  backdrop: any

  animeBrowse: FormGroup;

  public generos: Generos[] = [];
  public years: number[] = [];
  public loading: boolean = true;
  public error: any;
  public image: string = "";
  public temporada: string[] = ['Winter', 'Spring', 'Summer', 'Fall'];
  public estado: string[] = ['Airing', 'Finished', 'Not yet Aired', 'Cancelled'];
  public origen: string[] = ['Original', 'Manga', 'Light Novel', 'Novel', 'Anime', 'Visual Novel', 'Video Game', 'Doujinshi', 'Other'];

  public imgRandom: any;

  public textSearch: string = '';

  dropmenu = {
    'genero': false,
  }

  constructor(private animeService: AnimesService, private searchImage: SearchImageService) {
    this.animeBrowse = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      searchTextAdvanced: new FormControl(''),
      isAdult: new FormControl(false),
      genero: new FormArray([]),
      yearAnime: new FormControl(''),
      season: new FormControl(''),
      status: new FormControl(''),
      source: new FormControl(''),
      file: new FormControl('')
    })
  }


  changeSeason(e: any) {
    this.season?.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeStatus(e: any) {
    this.status?.setValue(e.target.value, {
      onlySelf: true
    })

    console.log(this.status?.value);
  }

  changeYearAnime(e: any) {
    this.yearAnime?.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeGenero(e: any) {
    const checkGeneres: FormArray = this.animeBrowse.get('genero') as FormArray;

    if (e.target.checked) {
      checkGeneres.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      checkGeneres.controls.forEach((ctrl) => {
        if (ctrl.value === e.target.value) {
          checkGeneres.removeAt(i);
          return;
        }
        i++
      })
    }
  }

  changeSource(e: any) {
    this.source?.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get searchTextAdvanced() {
    return this.animeBrowse.get('searchTextAdvanced');
  }


  get isAdult() {
    return this.animeBrowse.get('isAdult');
  }

  get yearAnime() {
    return this.animeBrowse.get('yearAnime');
  }

  get season() {
    return this.animeBrowse.get('season');
  }

  get status() {
    return this.animeBrowse.get('status');
  }

  get source() {
    return this.animeBrowse.get('source');
  }

  get file() {
    return this.animeBrowse.get('file');
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
    coverImage: this.imgAnimes,
  }];
  public ListaPagina: PagesAnime = {
    Page: {
      media: this.Animes,
      pageInfo: this.pageInfo
    }
  };

  public imageFound: SearchImage[] | undefined;

  public AnimesModal: IAnime[] = [{
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

  ngOnInit(): void {

    this.animeService.getGenere().subscribe(({ data, loading, error }) => {
      this.generos = data.GenreCollection;
      this.loading = loading
      this.error = error
    })

    let i: number = new Date().getFullYear()
    for (i; 1940 <= i; i--) {
      this.years.push(i);
    }

    let queryVariables = this.filterVariables();

    this.animeService.getFilterAnimes(queryVariables).subscribe(({ data, loading, error }) => {
      this.ListaPagina = data.Page as PagesAnime,
      this.Animes = data.Page.media as IAnime[],
      this.pageInfo = data.Page.pageInfo as PageInfo;
      this.loading = loading,
      this.error = error;
    })
  }

  togg(ev: any) {
    ev.preventDefault()
    this.dropmenu.genero = !this.dropmenu.genero
  }

  loadImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) { return; }

    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {

      this.image = reader.result as string;

      setTimeout(() => {
        this.searchLucky(this.image);
      }, 200)
    });
  }

  searchLucky = async (s: string) => {
    let img = document.querySelector("img");
    this.imgRandom = await this.searchImage.ImageSearch(img, s);
    this.imageFound = this.imgRandom.docs;

    this.showModal();
  }

  updateModal = (n: number[]) => {
    this.animeService.searchModal(n).subscribe(({ data, loading, error }) => {
      this.AnimesModal = data.Page.media as IAnime[],
        this.loading = loading,
        this.error = error;
        document.body.appendChild(this.backdrop)
    }).unsubscribe;
  }

  showModal = () => {

    let animesID: number[] = [];

    this.imageFound?.forEach((e) => {
      animesID.push(e.anilist_id);
    })

    let view = this.ModalSearch?.createEmbeddedView(null);

    if (view) this.vc?.insert(view);

    this.ModalSearch?.elementRef.nativeElement.previousElementSibling.classList.remove('fade');
    this.ModalSearch?.elementRef.nativeElement.previousElementSibling.classList.add('modal-open');
    this.ModalSearch.elementRef.nativeElement.previousElementSibling.style.display = 'block';

    let contenedor = document.getElementById('contenedor');
    contenedor?.classList.add('fixed-position')

    this.backdrop = document.createElement('DIV')
    this.backdrop.className = 'container-modal';

    if (animesID.length != 0) {
      let filterIDs = animesID.filter((el, i) => animesID.indexOf(el) === i);
      this.updateModal(filterIDs);
    }
  }

  closeModal() {
    this.vc?.clear()
    let contenedor = document.getElementById('contenedor');
    contenedor?.classList.remove('fixed-position')
    document.body.removeChild(this.backdrop);
  }

  convertString(s: string) {
    return s.replace(/[0-9]:\s/, '')
  }

  getVariables = (page: boolean = false): QueryVariables => {

    let current = 1;

    if (page){
      current = this.pageInfo.currentPage + 1;
    }

    console.log(current);

    let textAdulto: boolean = Boolean(this.animeBrowse.value.isAdult);
    let genero: string[] = this.animeBrowse.value.genero;
    let yearAnime: string = this.convertString((this.animeBrowse.value.yearAnime).toString());

    yearAnime ? yearAnime = yearAnime + '%': yearAnime = '';

    let season: string = this.convertString(this.animeBrowse.value.season).toUpperCase();

    let status: string = '';

    switch (this.convertString(this.animeBrowse.value.status)) {
      case 'Airign':
        status = 'RELEASING'
        break;
      case 'Finished':
        status = 'FINISHED'
        break;
      case 'Not yet Aired':
        status = 'NOT_YET_RELEASED'
        break;
      case 'Cancelled':
        status = 'CANCELLED'
        break;
    }

    let source: string = this.convertString(this.animeBrowse.value.source).toUpperCase();

    genero === undefined ? genero = [] : genero

    let filter: QueryVariables = this.filterVariables(this.textSearch, current, yearAnime, textAdulto, genero, season, status, source);
    return filter;
  }

  filterVariables = (search?: string, currentPage: number = 1, year?: string, isAdult: boolean = false, genero: string[] = [], season?: string, status?: string, src?: string, id_in: number[] = []) => {

    let variablesGraphQL: QueryVariables = {
      search: search,
      page: currentPage,
      year: year,
      isAdult: isAdult,
      genres: genero,
      season: season,
      status: status,
      source: src,
      type: "ANIME",
      id_in: id_in
    }

    for (let key in variablesGraphQL) {
      if (variablesGraphQL[key]?.toString() === '') {
        delete variablesGraphQL[key];
      }
    }
    return variablesGraphQL;
  }

  updatePage() {

    let variablesQuery = this.getVariables();

    this.animeService.getFilterAnimes(variablesQuery).subscribe(({data, loading, error})=> {
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

    let variablesQuery: QueryVariables =  this.getVariables(estado);

    this.animeService.getFilterAnimes(variablesQuery).subscribe(({ data, loading, error }) => {
      this.ListaPagina = data.Page as PagesAnime;
      this.Animes = this.Animes.concat(data.Page.media as IAnime[]),
      this.pageInfo = data.Page.pageInfo as PageInfo;
      this.loading = loading,
      this.error = error;
    })

  }
}
