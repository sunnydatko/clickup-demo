import { Action } from '@ngrx/store';
import { Column } from 'src/app/interfaces/column.interface';

export enum ActionTypes {
  LoadColumnsBegin = '[Data] Load columns begin',
  LoadColumnsSuccess = '[Data] Load columns success',
  LoadColumnsFailure = '[Data] Load columns failure',

  SaveColumnsBegin = '[Data] Save columns begin',
  SaveColumnsSuccess = '[Data] Save columns success',
  SaveColumnsFailure = '[Data] Save columns failure',
}

export class LoadColumnsBegin implements Action {
  readonly type = ActionTypes.LoadColumnsBegin;
}

export class LoadColumnsSuccess implements Action {
  readonly type = ActionTypes.LoadColumnsSuccess;

  constructor(public payload: { data: Column[] }) {}
}

export class LoadColumnsFailure implements Action {
  readonly type = ActionTypes.LoadColumnsFailure;

  constructor(public payload: { error: any }) {}
}

export class SaveColumnsBegin implements Action {
  readonly type = ActionTypes.SaveColumnsBegin;

  constructor(public payload: { data: Column[] }) {}
}

export class SaveColumnsSuccess implements Action {
  readonly type = ActionTypes.SaveColumnsSuccess;

  constructor(public payload: { data: Column[] }) {}
}

export class SaveColumnsFailure implements Action {
  readonly type = ActionTypes.SaveColumnsFailure;

  constructor(public payload: { error: any }) {}
}

export type ActionsUnion =
  | LoadColumnsBegin
  | LoadColumnsSuccess
  | LoadColumnsFailure
  | SaveColumnsBegin
  | SaveColumnsSuccess
  | SaveColumnsFailure;
