import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UsersService } from '../users.service';
import { User } from 'src/app/shared/models/user.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private searchText$ = new Subject<string>();
  users: User[] = [];
  displayedColumns: string[] = ['avatar', 'user_name', 'full_name', 'email', 'status', 'created_date', 'controls'];
  dataSource: MatTableDataSource<any>;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(name => this.usersService.searchUsers({name}))
    ).subscribe((result: User[]) => this.users = result);
    this.getUsers();
  }

  search(packageName: string) {
    this.searchText$.next(packageName);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsers() {
    this.usersService.searchUsers().subscribe(data => {
      if (data) {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  delete(id) {}
}
