import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ColumnService } from '../../services/columns/column.service';
import * as DataActions from '../actions/column.actions';
import { Column } from '../../interfaces/column.interface';

@Injectable()
export class ColumnEffects {
  constructor(private actions: Actions, private columnService: ColumnService) {}

  @Effect()
  loadData = this.actions.pipe(
    ofType(DataActions.ActionTypes.LoadColumnsBegin),
    switchMap(() => {
      return this.columnService.loadData().pipe(
        map((data) => new DataActions.LoadColumnsSuccess({ data: data })),
        catchError((error) =>
          of(new DataActions.LoadColumnsFailure({ error: error }))
        )
      );
    })
  );

  @Effect()
  updateColumns = this.actions.pipe(
    ofType(DataActions.ActionTypes.SaveColumnsBegin),
    mergeMap((action: any) =>
      this.columnService.saveColumns(action.payload.data).pipe(
        map((data: Column[]) => {
          return new DataActions.SaveColumnsSuccess({ data: data });
        }),
        catchError((error) => {
          return of(new DataActions.SaveColumnsFailure(error));
        })
      )
    )
  );
}
