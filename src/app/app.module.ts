import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatasAnimesComponent } from './datas-animes/datas-animes.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { AnimesService } from './services/animes.service';
import { AnimeItemComponent } from './anime-item/anime-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DatasAnimesComponent,
    AnimeItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [AnimesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
