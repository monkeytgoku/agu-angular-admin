import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestCacheService {

  cachedResponse = new Map<HttpRequest<any>, HttpResponse<any>>();

  constructor() { }

  get(req: HttpRequest<any>) { return this.cachedResponse.get(req); }

  put(req: HttpRequest<any>, event: HttpResponse<any>) {
    this.cachedResponse.set(req, event);
  }

}
