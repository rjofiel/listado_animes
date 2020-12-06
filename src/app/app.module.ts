import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatasAnimesComponent } from './datas-animes/datas-animes.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { AnimesService } from './services/animes.service';
import { AnimeItemComponent } from './anime-item/anime-item.component';
import { SearchanimeComponent } from './searchanime/searchanime.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { CommonModule } from '@angular/common';
import { AniLoginComponent } from './ani-login/ani-login.component';


@NgModule({
  declarations: [
    AppComponent,
    DatasAnimesComponent,
    AnimeItemComponent,
    SearchanimeComponent,
    AnimeDetailsComponent,
    AniLoginComponent
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
