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
  isAuthentificated = localStorage.getItem("accessToken") !== null

  sitesLogo = {
    Netflix: '',
    Funimation:'',
    AnimeLab: '',
    Crunchyroll: '',
    OfficialSite: ''
  }

  personalStaff: {
    nameCharacterFull: string,
    nameCharacterNative: string,
    imgCharacter: string,
    desCharacter: string,
    nameActorFull: string,
    nameActorNative: string,
    imgActor: string,
  }[]  = []

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

          this.animeData.externalLinks.forEach((el)=>{
            if(el.site === 'Netflix'){
              this.sitesLogo.Netflix = el.url
            }

            if(el.site === 'Funimation'){
              this.sitesLogo.Funimation = el.url
            }

            if(el.site === 'AnimeLab'){
              this.sitesLogo.AnimeLab = el.url
            }

            if(el.site === 'Crunchyroll'){
              this.sitesLogo.Crunchyroll = el.url
            }

            if(el.site === 'Official Site'){
              this.sitesLogo.OfficialSite = el.url
            }
          })

          this.setStaftData();
      }).unsubscribe
    }, 200)


  }

  setStaftData(){

    this.castAnime.forEach((character)=>{
      character.voiceActors.forEach((actor)=>{

      this.personalStaff.push({
      "nameCharacterFull": character.node.name.full,
      "nameCharacterNative": character.node.name.native,
      "imgCharacter":  character.node.image.medium,
      "desCharacter": character.node.description,
      "nameActorFull": actor.name.full,
      "nameActorNative": actor.name.native,
      "imgActor": actor.image.medium,})
      })
    })
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
