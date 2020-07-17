import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { UsersService } from '../services/users/users.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  columns: any[] = [
    { field: 'name', width: 100, index: 0 },
    { field: 'title', width: 350, index: 1 },
    { field: 'city', width: 250, index: 2 },
    { field: 'state', width: 100, index: 3 },
  ];

  displayedColumns: string[] = this.columns.map((column) => column.field);

  dataSource = new MatTableDataSource(this.users);
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.setupData();
    this.setupTable();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  setupData() {
    this.usersService
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.users = data;
      });
  }

  setupTable() {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
