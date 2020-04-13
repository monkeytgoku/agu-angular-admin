import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment as config } from '../../environments/environment';
import { HttpService } from '../core/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedinSubject = new BehaviorSubject<boolean>(false);
  $isLoggedin = this.isLoggedinSubject.asObservable();
  returnUrl = '/user';

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  getAuthStatus() {
    return this.isLoggedinSubject.value;
  }

  // tslint:disable-next-line: variable-name
  login(user_name: string, password: string) {
    return this.http.post(config.auth.authUrl, {user_name, password})
      .pipe(
        map(
          result => {
            if (result) {
              this.setSession(result);
              this.isLoggedinSubject.next(true);
              this.router.navigateByUrl(this.returnUrl);
            }
            return result;
          }
        )
      );
  }

  setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    localStorage.setItem('current_user', JSON.stringify(authResult.user) );
  }

  getAuthorizationToken() {
    return `Bearer ${localStorage.getItem('token')}`;
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('current_user');
    this.isLoggedinSubject.next(false);
    this.returnUrl = '/user';
    this.router.navigateByUrl('/login');
  }

  checkPermission(role) {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    const roles: string[] = currentUser.roles.split(',');
    return roles.indexOf(role) >= 0;
  }
}
