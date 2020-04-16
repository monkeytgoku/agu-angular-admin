import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment as config } from '../../environments/environment';
import { HttpService } from '../core/http/http.service';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpService) { }

  searchUsers(params = {}): Observable<User[]> {
    return this.http.get(`${config.api.baseUrl}/users`, params).pipe(map(users => users.map(user => new User(user))));
  }
}
