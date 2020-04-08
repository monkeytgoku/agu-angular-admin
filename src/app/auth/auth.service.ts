import { Injectable } from '@angular/core';

import { environment as config } from '../../environments/environment';
import { HttpService } from '../core/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService) { }

  login(data) {
    return this.http.post(config.auth.authUrl, data);
  }
}
