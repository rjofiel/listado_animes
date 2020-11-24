import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatasAnimesComponent } from './datas-animes/datas-animes.component';

const routes: Routes = [
  { path: 'ListadoAnimes', component: DatasAnimesComponent },
  { path: '', redirectTo: '/ListadoAnimes', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
