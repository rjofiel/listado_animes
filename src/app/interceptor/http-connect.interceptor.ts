import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpConnectInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log("Te encuentras dentro de la peticion de interceptor");

    console.log(request);
if(request.url === "https://trace.moe/api/search"){
  console.log(request);

  request.clone({
    setHeaders:{
      "Content-Type": 'aplication/json'
    }
  });
}


    return next.handle(request).pipe(
      catchError((err:HttpErrorResponse)=>{
        err.status

        return throwError(err)
      })
    );
  }
}
