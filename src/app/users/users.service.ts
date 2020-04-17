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

  getUsers(params = {}): Observable<User[]> {
    return this.http.get(`${config.api.baseUrl}/users`, params).pipe(map(users => users.map(user => new User(user))));
  }

  getUserById(userId) {
    return this.http.get(`/users/${userId}`);
  }

  addUser(user) {
    return this.http.post('/users/register', user);
  }

  updateUser(user) {
    return this.http.put(`/users/${user._id}`, user);
  }

  deleteUser(user) {
    return this.http.delete(`/users/${user._id}`);
  }
}
