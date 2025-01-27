import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  isValidToken: any;

  constructor(private toaster: ToastrService, private router: Router,) {
  }

  omitCalls = ['auth'];
  skipInterceptor = false;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes('api')) {
      this.skipInterceptor = true;
    }
    else {
      this.skipInterceptor = false
    }

    let token = localStorage.getItem('token');
    if (token && !this.skipInterceptor) {
      const Authorization = "Bearer " + localStorage.getItem('token') || "";
      return next.handle(req.clone({ setHeaders: { Authorization } })).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.toaster.error('Please Log In again', '', {
              positionClass: 'toast-top-center',
              timeOut: 700,
            });
            localStorage.removeItem('userDetail');
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
          return throwError(error);
        })
      );
    }
    return next.handle(req);
  }

}