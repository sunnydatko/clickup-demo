import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';

import * as fromColumns from './column.reducer';
import * as fromSort from './sort.reducer';
import * as fromUsers from './users.reducer';

export interface AppState {
  columnState: fromColumns.DataState;
  sortState: fromSort.DataState;
  userState: fromUsers.DataState;
}

export const reducers: ActionReducerMap<AppState> = {
  columnState: fromColumns.reducer,
  sortState: fromSort.reducer,
  userState: fromUsers.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];

export const getColumnsState = (state: AppState) => state.columnState;
export const getSortState = (state: AppState) => state.sortState;
export const getUsersState = (state: AppState) => state.userState;

export const getAllColumns = createSelector(
  getColumnsState,
  fromColumns.getColumns
);
export const getAllSortData = createSelector(
  getSortState,
  fromSort.getSortData
);
export const getAllUsers = createSelector(getUsersState, fromUsers.getUsers);
