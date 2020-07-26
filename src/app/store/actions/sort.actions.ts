import { Action } from '@ngrx/store';
import { SortData } from 'src/app/interfaces/sort.interface';

export enum ActionTypes {
  LoadSortBegin = '[Data] Load sort begin',
  LoadSortSuccess = '[Data] Load sort success',
  LoadSortFailure = '[Data] Load sort failure',

  SaveSortBegin = '[Data] Save sort begin',
  SaveSortSuccess = '[Data] Save sort success',
  SaveSortFailure = '[Data] Save sort failure',
}

export class LoadSortBegin implements Action {
  readonly type = ActionTypes.LoadSortBegin;
}

export class LoadSortSuccess implements Action {
  readonly type = ActionTypes.LoadSortSuccess;

  constructor(public payload: { data: any }) {}
}

export class LoadSortFailure implements Action {
  readonly type = ActionTypes.LoadSortFailure;

  constructor(public payload: { error: any }) {}
}

export class SaveSortBegin implements Action {
  readonly type = ActionTypes.SaveSortBegin;

  constructor(public payload: { data: SortData[] }) {}
}

export class SaveSortSuccess implements Action {
  readonly type = ActionTypes.SaveSortSuccess;

  constructor(public payload: { data: SortData[] }) {}
}

export class SaveSortFailure implements Action {
  readonly type = ActionTypes.SaveSortFailure;

  constructor(public payload: { error: any }) {}
}

export type ActionsUnion =
  | LoadSortBegin
  | LoadSortFailure
  | LoadSortSuccess
  | SaveSortBegin
  | SaveSortFailure
  | SaveSortSuccess;
