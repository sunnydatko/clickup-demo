import { Action } from '@ngrx/store';

export enum ActionTypes {
  LoadUsersBegin = '[Data] Load users begin',
  LoadUsersSuccess = '[Data] Load users success',
  LoadUsersFailure = '[Data] Load users failure',
}

export class LoadUsersBegin implements Action {
  readonly type = ActionTypes.LoadUsersBegin;
}

export class LoadUsersSuccess implements Action {
  readonly type = ActionTypes.LoadUsersSuccess;

  constructor(public payload: { data: any }) {}
}

export class LoadUsersFailure implements Action {
  readonly type = ActionTypes.LoadUsersFailure;

  constructor(public payload: { error: any }) {}
}

export type ActionsUnion = LoadUsersBegin | LoadUsersSuccess | LoadUsersFailure;
