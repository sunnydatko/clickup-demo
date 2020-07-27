import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { Column } from '../../interfaces/column.interface';
import { SortData } from '../../interfaces/sort.interface';
import { User } from '../../interfaces/user.interface';
import { ColumnService } from '../../services/columns/column.service';
import { SortService } from '../../services/sort/sort.service';
import { UsersService } from '../../services/users/users.service';
import * as ColumnActions from '../../store/actions/column.actions';
import * as SortActions from '../../store/actions/sort.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  columns: Column[];
  sortData: SortData[];
  users: User[];

  columnState$: Observable<User[]>;
  sortState$: Observable<User[]>;
  userState$: Observable<User[]>;

  columnSubscription: Subscription;
  sortSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private columnService: ColumnService,
    private sortService: SortService,
    private usersService: UsersService,
    private store: Store<User>
  ) {}

  ngOnInit() {
    this.userSubscription = this.usersService.getData().subscribe((data) => {
      this.users = data.users;
    });

    this.columnSubscription = this.columnService.getData().subscribe((data) => {
      this.columns = data.columns;
    });

    this.sortService.getData().subscribe((data) => {
      this.sortData = data.sortData;
    });
  }

  ngOnDestroy() {
    this.columnSubscription.unsubscribe();
    this.sortSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  onColumnChange(event) {
    this.store.dispatch(new ColumnActions.SaveColumnsBegin({ data: event }));
  }

  onSortChange(event) {
    this.store.dispatch(new SortActions.SaveSortBegin({ data: event }));
  }
}
