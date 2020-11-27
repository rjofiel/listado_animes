import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'anime-list';

  constructor(
    private router: Router){

  }

  volver = (e:any) => {
    e.preventDefault();
    this.router.navigate(['/ListadoAnimes/page', 1]);
  }
}
