import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('userName') userName: any;
  @ViewChild('password') password: any;

  initialUser = {
    userName: localStorage.getItem('userName'),
    isRememberMe: false
  };
  isShowErrorMsg = false;

  constructor(private authService: AuthService, private translate: TranslateService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.userName.valueChanges.subscribe(changes => this.isShowErrorMsg = false);
    this.password.valueChanges.subscribe(changes => this.isShowErrorMsg = false);
  }

  onSubmit(loginForm) {
    const formValue = loginForm.value;
    this.authService.login(formValue.userName, formValue.password)
      .subscribe(
        result => { loginForm.resetForm(); },
        error => { this.isShowErrorMsg = true; }
      );

    if (formValue.isRememberMe) {
      this.rememberMe(formValue.userName);
    }
  }

  rememberMe(userName) {
    localStorage.setItem('userName', userName);
  }

}
