import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { AnimesService } from './services/animes.service';
import { SearchanimeComponent } from './searchanime/searchanime.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CommonModule } from '@angular/common';


import { DatasAnimesComponent } from './structure/Home/datas-animes.component';
import { AnimeItemComponent } from './structure/dataAnime/anime-item.component';
import { AnimeDetailsComponent } from './structure/Details/anime-details.component';
import { AniLoginComponent } from './structure/Auth/ani-login.component';
import { UpdateAnimeComponent } from './update-anime/update-anime.component';
import { FiltersAnimeComponent } from './structure/filters-anime/filters-anime.component';
import { PotentialResultsComponent } from './potential-results/potential-results.component';


@NgModule({
  declarations: [
    AppComponent,
    DatasAnimesComponent,
    AnimeItemComponent,
    SearchanimeComponent,
    AnimeDetailsComponent,
    AniLoginComponent,
    UpdateAnimeComponent,
    FiltersAnimeComponent,
    PotentialResultsComponent,
  ],
  imports: [
    [BrowserModule, InfiniteScrollModule ],
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [AnimesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
