import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticated } from './interfaces/query-variables';
import { AnimesService } from './services/animes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'anime-list';

  userAuthentificated = localStorage.getItem("accessToken") ? true : false

  userLogged !:UserAuthenticated


  constructor(private router: Router, private animeService: AnimesService) {

    if (this.userAuthentificated) {
      this.animeService.getToken().subscribe(({ data, loading, error }) => {
        this.userLogged = data.Viewer;
      })
    }

  }

  volver = (e: any) => {
    e.preventDefault();
    this.router.navigate(['/ListadoAnimes/page', 1]);
  }
}
