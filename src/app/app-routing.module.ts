import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AniLoginComponent } from './ani-login/ani-login.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { DatasAnimesComponent } from './datas-animes/datas-animes.component';
import { SearchanimeComponent } from './searchanime/searchanime.component';

const routes: Routes = [
  { path: 'ListadoAnimes/page/:id', component: DatasAnimesComponent },
  { path: 'detail/:id', component: AnimeDetailsComponent },
  { path: 'Busqueda', component: SearchanimeComponent },
  { path: 'Login', component: AniLoginComponent },
  { path: '', redirectTo: '/ListadoAnimes/page/1', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
