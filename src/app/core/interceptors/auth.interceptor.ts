import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";

export const excludedRoutes = ['/login', '/createCustomer'];

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (excludedRoutes.some(route => req.url.includes(route))) {
    return next(req);
  }

  const token = authService.$userInfo()?.token;
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  console.log("Token passed");

  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          router.navigate(['/login']);
        }
      }
      return throwError(err)
    })
  );
};
