import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticated } from 'src/app/interfaces/query-variables';
import { AnimesService } from 'src/app/services/animes.service';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.css']
})
export class HeaderNavigationComponent implements OnInit {

  Authentificated = localStorage.getItem("accessToken") ? true : false

  userLogged !:UserAuthenticated
  noLoged: boolean = true;


  constructor(private router: Router, private animeService: AnimesService) {

    if (this.Authentificated) {
      this.animeService.getToken().subscribe(({ data, loading, error }) => {
        this.userLogged = data.Viewer;

      })
    }

  }

  volver = (e: any) => {
    e.preventDefault();
    this.router.navigate(['/EntryAnime/page', 1])
  }

  userLogout(){
    localStorage.removeItem('accessToken');
    window.location.reload();
  }

  ngOnInit(): void {
  }

}
