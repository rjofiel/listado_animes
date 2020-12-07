import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatasAnimesComponent } from './structure/Home/datas-animes.component';
import { AnimeDetailsComponent } from './structure/Details/anime-details.component';
import { AniLoginComponent } from './structure/Auth/ani-login.component';

import { SearchanimeComponent } from './searchanime/searchanime.component';
import { UpdateAnimeComponent } from './update-anime/update-anime.component';

const routes: Routes = [
  { path: 'ListadoAnimes/page/:id', component: DatasAnimesComponent },
  { path: 'detail/:id', component: AnimeDetailsComponent },
  { path: 'Busqueda', component: SearchanimeComponent },
  { path: 'Login', component: AniLoginComponent },
  { path: 'Modal', component: UpdateAnimeComponent },
  { path: '', redirectTo: '/ListadoAnimes/page/1', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
