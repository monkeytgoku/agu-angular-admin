import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
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
  APP_STORAGE = {
    token: '',
    expiresIn: 0,
    expiresAt: null,
    currentUser: {}
  };
  $refreshToken: Subscription;

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  // tslint:disable-next-line: variable-name
  login(user_name: string, password: string) {
    return this.http.post(config.auth.authUrl, { user_name, password })
      .pipe(
        map(
          result => {
            console.log(result);
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

    // localStorage.setItem('token', authResult.token);
    // localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    // localStorage.setItem('current_user', JSON.stringify(authResult.user));

    // cookie
    this.APP_STORAGE.token = authResult.token;
    this.APP_STORAGE.expiresIn = parseInt(authResult.expiresIn, 10);
    this.APP_STORAGE.expiresAt = JSON.stringify(expiresAt.valueOf());
    this.APP_STORAGE.currentUser = JSON.stringify(authResult.user);

    this.scheduleRefresh();
  }

  scheduleRefresh() {
    if (!this.isLoggedIn()) { return; }
    this.unscheduleRefresh();

    // const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    console.log('expiresIn:', this.APP_STORAGE.expiresIn);

    const expiresIn$ = interval(this.APP_STORAGE.expiresIn * 1000);
    this.$refreshToken = expiresIn$.subscribe(() => this.refreshToken());
  }

  isLoggedIn() {
    // const expiresAt = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(this.APP_STORAGE.expiresAt);
    return moment().isBefore(moment(expiresAt));
  }

  unscheduleRefresh() {
    if (this.$refreshToken) {
      this.$refreshToken.unsubscribe();
    }
  }

  refreshToken() {
    console.log('refreshToken');
    this.http.post(config.auth.refreshTokenUrl, {}).subscribe(
      result => this.setSession(result)
    );
  }

  getAuthorizationToken() {
    return `Bearer ${this.APP_STORAGE.token}`;
  }

  logout() {
    return this.http.get(config.auth.logoutUrl).subscribe(result => {
      console.log(result);
      // localStorage.removeItem('token');
      // localStorage.removeItem('expires_at');
      // localStorage.removeItem('current_user');

      this.APP_STORAGE = {
        token: '',
        expiresIn: 0,
        expiresAt: null,
        currentUser: {}
      };

      this.isLoggedinSubject.next(false);
      this.returnUrl = '/user';
      this.router.navigateByUrl('/login');
    });
  }

  checkPermission(role) {
    // const currentUser = JSON.parse(localStorage.getItem('current_user'));
    // const roles: string[] = currentUser.roles.split(',');
    // return roles.indexOf(role) >= 0;
    return true;
  }
}
