import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../@service/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.currentUserValue && this.authService.currentUserValue.token) {
      request = request.clone({
        setHeaders: {
          'auth-token': `${this.authService.currentUserValue.token}`
        }
      });
    }
    return next.handle(request);
  }
}