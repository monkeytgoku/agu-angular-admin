import { Injectable } from '@angular/core';

import { environment as config } from '../../environments/environment';
import { HttpService } from '../core/http/http.service';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpService) { }

  searchUsers(params) {
    return this.http.get(`${config.api.baseUrl}/user`, params);
  }
}
