import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  initialUser = {
    userName: localStorage.getItem('userName'),
    isRememberMe: false
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(loginForm) {
    const formValue = loginForm.value;
    this.authService.login({
      user_name: formValue.userName,
      password: formValue.password
    })
      .subscribe(result => {
        loginForm.resetForm();
        this.router.navigateByUrl('/user');
      });

    if (formValue.isRememberMe) {
      this.rememberMe(formValue.userName);
    }
  }

  rememberMe(userName) {
    localStorage.setItem('userName', userName);
  }

}
