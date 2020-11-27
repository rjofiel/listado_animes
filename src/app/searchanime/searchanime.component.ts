import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Generos } from '../interfaces/generos';
import { IAnime } from '../interfaces/i-anime';
import { ImgAnime } from '../interfaces/img-anime';
import { PagesAnime } from '../interfaces/pages-anime';
import { SearchImage } from '../interfaces/search-image';
import { AnimesService } from '../services/animes.service';
import { SearchImageService } from '../services/search-image.service';


@Component({
  selector: 'app-searchanime',
  templateUrl: './searchanime.component.html',
  styleUrls: ['./searchanime.component.css']
})
export class SearchanimeComponent implements OnInit {

  @ViewChild('ModalSearch')
  ModalSearch!: TemplateRef<any>;
  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef | undefined;

  backdrop: any

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

  constructor(private animeService: AnimesService, private searchImage: SearchImageService) { }


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

  public imageFound: SearchImage[] | undefined;


  public imgAnimesModal: ImgAnime = {
    large: '',
    medium: '',
  }

  public temporal: IAnime[] = [{
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

  public ListaPaginaModal: PagesAnime = {
    Page: {
      media: this.Animes,
    }
  };


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

    this.initSearch()
  }

  initSearch = () => {
    this.animeService.getDataAdv().subscribe(({ data, loading, error }) => {
      this.ListaPagina = data.Page as PagesAnime,
        this.Animes = data.Page.media as IAnime[],
        this.loading = loading,
        this.error = error;
    })
  }

  togg(ev: any) {
    ev.preventDefault()
    this.dropmenu.genero = !this.dropmenu.genero
  }


  async loadImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) { return; }

    const reader: FileReader = new FileReader();

    reader.readAsDataURL(fileInput.files[0]);

    reader.addEventListener('loadend', async () => {

      this.image = reader.result as string;

      setTimeout(() => {
        this.srchImage(this.image);
      }, 200)

    });


  }

  srchImage = async (s: string) => {
    let img = document.querySelector("img");
    this.imgRandom = await this.searchImage.ImageSearch(img, s);
    this.imageFound = this.imgRandom.docs;

    this.showModal();
  }

  Animesearch = (ev: Event): void => {
    if (this.textSearch) {
      ev.preventDefault();
      this.animeService.searchAdvanced(this.textSearch).subscribe(({ data, loading, error }) => {
        this.ListaPagina = data.Page as PagesAnime,
          this.Animes = data.Page.media as IAnime[],
          this.loading = loading,
          this.error = error;
      }).unsubscribe;
    } else {
      this.initSearch()
    }

  }

  AnimesearchModal = (n: number[])=> {
      this.animeService.searchModal(n).subscribe(({ data, loading, error }) => {
          this.AnimesModal  = data.Page.media as IAnime[],
          this.loading = loading,
          this.error = error;
      }).unsubscribe;

  }

  showModal = () => {

    let arrayID: number[] = [];

    this.imageFound?.forEach( (e) => {
        arrayID.push(e.anilist_id);
    })

    if(arrayID !== []){
    let noRepeat = arrayID.filter((el, i)=> arrayID.indexOf(el)===i);

    this.AnimesearchModal(noRepeat);
    }


    let view = this.ModalSearch?.createEmbeddedView(null);

    if (view)
      this.vc?.insert(view);

    this.ModalSearch?.elementRef.nativeElement.previousElementSibling.classList.remove('fade');
    this.ModalSearch?.elementRef.nativeElement.previousElementSibling.classList.add('modal-open');

    this.ModalSearch.elementRef.nativeElement.previousElementSibling.style.display = 'block';

    let contenedor = document.getElementById('contenedor');
    contenedor?.classList.add('fixed-position')


    this.backdrop = document.createElement('DIV')
    this.backdrop.className = 'container-modal';
    document.body.appendChild(this.backdrop)
  }



  closeModal() {
    this.vc?.clear()
    let contenedor = document.getElementById('contenedor');
    contenedor?.classList.remove('fixed-position')
    document.body.removeChild(this.backdrop);
  }
}
