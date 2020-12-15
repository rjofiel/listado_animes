import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatasAnimesComponent } from './structure/Home/datas-animes.component';
import { AnimeDetailsComponent } from './structure/Details/anime-details.component';
import { AniLoginComponent } from './structure/Auth/ani-login.component';

import { SearchanimeComponent } from './searchanime/searchanime.component';
import { ContactComponent } from './structure/contact/contact.component';

const routes: Routes = [
  { path: 'EntryAnime/page/:id', component: DatasAnimesComponent },
  { path: 'detail/:id', component: AnimeDetailsComponent },
  { path: 'Search', component: SearchanimeComponent },
  { path: 'Login', component: AniLoginComponent },
  { path: 'Contact', component: ContactComponent },
  { path: '', redirectTo: '/EntryAnime/page/1', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
