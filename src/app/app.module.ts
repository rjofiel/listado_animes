import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { ContactComponent } from './structure/contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TruncatePipePipe } from './pipes/truncate-pipe.pipe';
import { HttpConnectInterceptor } from './interceptor/http-connect.interceptor';
import { SearchImageService } from './services/search-image.service';
import { HeaderNavigationComponent } from './structure/header-navigation/header-navigation.component';


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
    ContactComponent,
    TruncatePipePipe,
    HeaderNavigationComponent,
  ],
  imports: [
    [BrowserModule, InfiniteScrollModule ],
    AppRoutingModule,
    GraphQLModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [AnimesService, SearchImageService, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConnectInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
