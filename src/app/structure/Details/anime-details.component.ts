import { Component, NgModule, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimesService } from '../../services/animes.service';
import { QueryVariables } from '../../interfaces/query-variables';
import { AnimeDetails, infoCast,  } from '../../interfaces/anime-details';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IAnime } from 'src/app/interfaces/pages-anime';
import { MatDialog } from '@angular/material/dialog';
import { UpdateAnimeComponent } from 'src/app/update-anime/update-anime.component';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.css']
})

export class AnimeDetailsComponent implements OnInit {

  selectAnime !: IAnime ;

  constructor(public updateEntry: MatDialog, private route: ActivatedRoute, private animesService: AnimesService, private sanitizer: DomSanitizer) { }

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

  showDialog(e:IAnime | AnimeDetails){
    const dialogRef = this.updateEntry.open(UpdateAnimeComponent, {
      width: '600px',
      data: e,
    })

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);

    })
  }


}
