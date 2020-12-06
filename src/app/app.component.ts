import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AnimesService } from './services/animes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent {
  title = 'anime-list';

  @Input() userAuthentificated2 = ''



  userAuthentificated = localStorage.getItem("accessToken") ? true:false
  USER = {
    Viewer: {
    id: 0,
    name: '',
  }
}

  constructor(private router: Router, private animeService: AnimesService){

    this.animeService.getToken().subscribe(({data,loading, error})=>{
      this.USER = data;
      console.log(loading);
      console.log(error);
    })
    }

  volver = (e:any) => {
    e.preventDefault();
    this.router.navigate(['/ListadoAnimes/page', 1]);
  }
}
