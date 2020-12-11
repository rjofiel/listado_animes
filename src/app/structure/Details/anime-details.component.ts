import { Component, NgModule, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimesService } from '../../services/animes.service';
import { QueryVariables } from '../../interfaces/query-variables';
import { AnimeDetails, infoCast,  } from '../../interfaces/anime-details';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IAnime } from 'src/app/interfaces/pages-anime';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.css']
})

export class AnimeDetailsComponent implements OnInit {

  selectAnime !: IAnime ;

  constructor(private route: ActivatedRoute, private animesService: AnimesService, private sanitizer: DomSanitizer) { }

  @ViewChild('modalAddAnime') modal !: TemplateRef<any>;
  @ViewChild('modalOpened', { read: ViewContainerRef }) opened !: ViewContainerRef;

  loading: boolean = true;
  error: any;

  public safeURL!: SafeResourceUrl;

  animeData!: AnimeDetails;
  castAnime !: infoCast[];

  urlTrailer = 'https://www.youtube.com/embed/'

  ngOnInit(): void {


    const idAnime: number = parseInt(this.route.snapshot.params['id']);

    let variableQueries: QueryVariables = {
      page: -1,
      type: "ANIME",
      genres: [],
      isAdult: false,
      id: 0
    }
    variableQueries.id = idAnime;

    for (let key in variableQueries) {
      if (variableQueries[key]?.toString() === '' || variableQueries[key] === -1) {
        delete variableQueries[key];
      }
    }

    setTimeout(() => {
      this.animesService.getDetailAnime(variableQueries).subscribe(({ data, loading, error }) => {
        this.animeData = this.animesService.fixDescription(data.Media) as AnimeDetails,
        this.castAnime = this.animeData.characters.edges;
        this.loading = loading,
        this.error = error

          if(this.animeData.trailer){
            this.loadTrailer();
          }
      }).unsubscribe
    }, 200)


  }

  loadTrailer() {
    this.urlTrailer = this.urlTrailer + this.animeData.trailer.id
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlTrailer);
    setTimeout(() => {
      let iframe = document.getElementsByTagName("iframe")[0];
      iframe.style.backgroundImage = this.animeData.trailer.thumbnail;
    }, 300);
  }


  backdrop: any

  openModal = (e: IAnime | AnimeDetails) => {

    let view = this.modal.createEmbeddedView(null);

    this.opened.insert(view);

    let contenedor = document.getElementById('contenedorDetails')

    contenedor?.classList.add('fixed-position');

    this.backdrop = document.createElement('DIV');
    this.backdrop.className = 'container-modal';

    this.selectAnime = e;
    document.body.appendChild(this.backdrop);

  }

  close = () => {
    this.opened.clear()
    let contenedor = document.getElementById('contenedorDetails');
    contenedor?.classList.remove('fixed-position')
    document.body.removeChild(this.backdrop);
  }


}
