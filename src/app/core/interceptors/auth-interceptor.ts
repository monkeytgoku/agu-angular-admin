import {
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment as config } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent |
                                                       HttpHeaderResponse |
                                                       HttpProgressEvent |
                                                       HttpResponse<any> |
                                                       HttpUserEvent<any>> {
    if (req.url.indexOf(config.auth.authUrl) > 0) {
      return next.handle(req);
    }
    const copiedReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)});
    return next.handle(copiedReq);
  }
}
