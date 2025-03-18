import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtinterceptorService {

  omitCalls = ['auth'];
  skipInterceptor = false;
  upperlevelDomain: string = '';

  constructor(private router: Router,) {

    var parts = location.hostname.split('.');
    var subdomain = parts.shift();
    this.upperlevelDomain = parts.join('.');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let localset = localStorage.getItem('localset');
    if (req.url.includes('getThemeConfig') && (localset == null || localset == undefined)) {
      this.skipInterceptor = true;
    }
    else {
      this.skipInterceptor = false
    }
    let token = localStorage.getItem('token');
    if (token && token != '' && token !== undefined && !this.skipInterceptor) {
      const Authorization = "Bearer " + localStorage.getItem('token') || "";
      return next.handle(req.clone({ setHeaders: { Authorization } })).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.router.navigate(['/unauthorized']);
          }
          return throwError(error);
        })
      );
    }
    else {
    //   if (!this.skipInterceptor)
    //     this.router.navigate(['/unautherized']);
    // }
    return next.handle(req);
  }
}
}
