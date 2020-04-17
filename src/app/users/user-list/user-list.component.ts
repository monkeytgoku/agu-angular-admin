import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NotifyService } from 'src/app/core/services/notify.service';
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { User } from 'src/app/shared/models/user.model';

import { UserNewComponent } from '../user-new/user-new.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  private searchText$ = new Subject<string>();
  users: User[] = [];
  displayedColumns: string[] = ['avatar', 'userName', 'fullName', 'email', 'gender', 'mobile', 'lang', 'status', 'createdDate', 'controls'];
  dataSource: MatTableDataSource<any>;

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    private notifyService: NotifyService
  ) { }

  ngOnInit(): void {
    this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(name => this.usersService.getUsers({ name }))
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
    this.usersService.getUsers().subscribe((result: User[]) => {
      if (result) {
        console.log(result);
        this.dataSource = new MatTableDataSource<any>(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  openDialog(type, user?): void {
    switch (type) {
      case 'add':
        const addDialogRef = this.dialog.open(UserNewComponent, {
          width: '50%',
          data: {
            type: 'add'
          }
        });
        addDialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log(result);

            // this.addUser({ ...result });
          }
        });
        break;
      case 'edit':
        const editDialogRef = this.dialog.open(UserNewComponent, {
          width: 'auto',
          data: { type: 'edit', ...user }
        });
        editDialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.updateUser({ ...result });
          }
        });
        break;
      case 'delete':
        const deleteDialogRef = this.dialog.open(ConfirmPopupComponent, {
          width: 'auto',
          data: { message: 'Are you sure you want to delete this user?' }
        });
        deleteDialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.deleteUser(user);
          }
        });
        break;
      default:
        break;
    }
  }

  addUser(user) {
    this.usersService.addUser(user).subscribe(
      data => {
        this.notifyService.openSnackBar(data.message);
        this.getUsers();
      },
      error => {
        this.notifyService.openSnackBar('An error occurred, please try again?');
      });
  }

  updateUser(user) {
    this.usersService.updateUser(user).subscribe(
      data => {
        this.notifyService.openSnackBar(data.message);
        this.getUsers();
      },
      error => {
        this.notifyService.openSnackBar('An error occurred, please try again?');
      });
  }

  deleteUser(user) {
    this.usersService.deleteUser(user).subscribe(
      data => {
        this.notifyService.openSnackBar(data.message);
        this.getUsers();
      },
      error => {
        this.notifyService.openSnackBar('An error occurred, please try again?');
      });
  }
}
