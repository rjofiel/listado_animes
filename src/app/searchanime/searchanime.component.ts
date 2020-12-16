import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { subscribe } from 'graphql';
import { Generos } from '../interfaces/generos';
import { IAnime, ImgAnime, PageInfo, PagesAnime } from '../interfaces/pages-anime';
import { QueryVariables } from '../interfaces/query-variables';
import { SearchImage } from '../interfaces/search-image';
import { PotentialResultsComponent } from '../potential-results/potential-results.component';
import { AnimesService } from '../services/animes.service';
import { SearchImageService } from '../services/search-image.service';


@Component({
  selector: 'app-searchanime',
  templateUrl: './searchanime.component.html',
  styleUrls: ['./searchanime.component.css']
})
export class SearchanimeComponent implements OnInit {


  constructor(private animeService: AnimesService, private searchImage: SearchImageService, public potentialModal: MatDialog) {}

  selector: string = '.search-results'
  @ViewChild('ModalSearch') ModalSearch!: TemplateRef<any>;
  backdrop: any


  public generos!: Generos[];
  public loading: boolean = true;
  loadingFilters: boolean = true;
  problemData: boolean = false;
  public error: any;
  public imgRandom: any;

  public textSearch: string = '';

  variablesQuery!: QueryVariables;
  luckyStatus:boolean = false;


  public pageInfo!: PageInfo;
  public imgAnimes!: ImgAnime;
  public Animes!: IAnime[];
  public ListaPagina!: PagesAnime;

  public imageFound!: SearchImage[];
  public AnimesModal!: IAnime[];

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
      this.loadingFilters = false;
    })
  }

  searchLucky = async (s: string) => {


    this.luckyStatus = true;

    let img = document.querySelector("#potentialImg");

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
    const potentialModal: MatDialogRef<PotentialResultsComponent, any> = this.loadedDialog()

      if(potentialModal){
        this.luckyStatus = false;
      }
  }

  loadedDialog(): MatDialogRef<PotentialResultsComponent, any>{
   return this.potentialModal.open(PotentialResultsComponent, {
      width:'690px',
      data: this.arrayId,
    },)
  }

   closedModalSelect(){
     this.potentialModal.closeAll()
   }


  dataModalUpdate!: IAnime;


  updatePage() {
    this.loadingFilters = true
    this.animeService.getFilterAnimes(this.variablesQuery).subscribe(({data, loading, error})=> {
      this.ListaPagina = data.Page as PagesAnime,
      this.Animes = data.Page.media as IAnime[]
      this.pageInfo = data.Page.pageInfo as PageInfo,
      this.loadingFilters = loading,
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


 }
