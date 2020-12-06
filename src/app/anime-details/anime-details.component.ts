import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AnimesService } from '../services/animes.service';
import { QueryVariables } from '../interfaces/query-variables';
import { AnimeDetails } from '../interfaces/anime-details';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.css']
})

export class AnimeDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private animesService: AnimesService, private sanitizer: DomSanitizer) { }

  loading: boolean = true;
  error: any;

  public safeURL: SafeResourceUrl | undefined;

  animeData: AnimeDetails = {
    id: 0,
    title: {
      romaji: '',
      userPreferred: '',
    },
    status: '',
    episodes: 0,
    description: '',
    characters: {
      edges: [
        {
          role: "",
          node: {
            name: {
              full: "",
              native: ""
            },
            image: {
              medium: ""
            },
            description: ""
          },
          voiceActors: [
            {
              name: {
                full: "",
                native: ""
              },
              image: {
                medium: ""
              }
            }
          ]
        }
      ]
    },
    coverImage: {
      large: '',
      medium: '',
    },
    startDate: {
      year: 0,
      month: 0,
      day: 0
    },
    endDate: {
      year: 0,
      month: 0,
      day: 0
    },
    externalLinks: [{
      id: 0,
      url: "",
      site: ""
    }
    ],
    trailer: {
      id: "",
      site: "",
      thumbnail: ""
    },
    bannerImage: "",
    season: "",
    type: "",
    format: "",
    duration: 0,
    genres: [],
    isAdult: false,
    averageScore: 80,
    nextAiringEpisode: {
      airingAt: 0,
      episode: 0,
      timeUntilAiring: 0,
    },
    studios: {
      edges: [
        {
          isMain: true,
          node: {
            name: ""
          }
        }
      ]
    }
  };

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
        this.animeData = this.animesService.fixDescription(data.Media as AnimeDetails) as AnimeDetails,
          this.loading = loading,
          this.error = error

        this.loadTrailer();

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
}
