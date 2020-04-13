import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'agu-angular-admin';

  constructor(public auth: AuthService) {  }
}
