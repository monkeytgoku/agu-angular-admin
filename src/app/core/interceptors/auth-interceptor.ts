import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { environment as config } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('AuthInterceptor');

    if (req.url.indexOf(config.auth.authUrl) > 0) {
      return next.handle(req);
    }

    const authToken = this.auth.getAuthorizationToken();
    // the HttpRequest and HttpResponse instance properties are readonly
    // The clone() method's hash argument allows you to mutate specific properties of the request while copying the others.
    const authReq = req.clone({headers: req.headers.set('Authorization', authToken), withCredentials: true});
    return next.handle(authReq);
  }
}
