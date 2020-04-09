import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UsersService } from '../users.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private searchText$ = new Subject<string>();
  users: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(name => this.usersService.searchUsers({name}))
    ).subscribe((result: User[]) => this.users = result);
  }

  search(packageName: string) {
    this.searchText$.next(packageName);
  }

}
