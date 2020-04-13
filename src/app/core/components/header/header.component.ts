import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser = {};

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('current_user'));
  }

  logout() {
    this.auth.logout();
  }
}
