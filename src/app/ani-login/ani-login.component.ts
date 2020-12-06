
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map} from 'rxjs/operators';

@Component({
  selector: 'app-ani-login',
  templateUrl: './ani-login.component.html',
  styleUrls: ['./ani-login.component.css']
})



export class AniLoginComponent implements OnInit {

  @Input() apikey: string = ''

  user: any;
  loading: any;
  err: any;

  constructor(private route: ActivatedRoute, private ruta: Router) {
   }

  ngOnInit(): void {

    this.route.fragment.pipe(map(fragment => new URLSearchParams(fragment)),
      map(params => ({
        access_token:params.get('access_token'),
      }))
    ).subscribe((res) => {
      if(res.access_token){
        localStorage.setItem('accessToken', res.access_token)
        this.ruta.navigate(['/ListadoAnimes/page/', 1])
        }
    })
  }

  test = () => {
    console.log("test");

  }
}
