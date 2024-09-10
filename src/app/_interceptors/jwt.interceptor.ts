import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.url.includes("api.mercadopago.com")){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${environment.mercadoPagoKey}`,
          'Access-Control-Allow-Origin': '*'
        }
      })
      return next.handle(request);  
    }

    // add authorization header with jwt token if available
    let accessToken = this.authService.accessTokenValue;
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    }

    return next.handle(request);
  }
}
