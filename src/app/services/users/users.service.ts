import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as DataActions from '../../store/actions/users.actions';
import { AppState, getAllUsers, getUsersState } from '../../store/reducers';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private store: Store<AppState>, private http: HttpClient) {}

  loadData() {
    return this.http.get('/assets/users.json');
  }

  load() {
    this.store.dispatch(new DataActions.LoadUsersBegin());
  }

  getData() {
    return this.store.select(getUsersState);
  }

  getUsers() {
    return this.store.select(getAllUsers);
  }
}
