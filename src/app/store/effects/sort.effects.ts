import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { SortService } from '../../services/sort/sort.service';
import * as DataActions from '../actions/sort.actions';
import { SortData } from '../../interfaces/sort.interface';

@Injectable()
export class SortEffects {
  constructor(private actions: Actions, private sortService: SortService) {}

  @Effect()
  loadData = this.actions.pipe(
    ofType(DataActions.ActionTypes.LoadSortBegin),
    switchMap(() => {
      return this.sortService.loadData().pipe(
        map(
          (data) =>
            new DataActions.LoadSortSuccess({ data: data })),
        catchError((error) =>
          of(new DataActions.LoadSortFailure({ error: error }))
        )
      );
    })
  );

  @Effect()
  updateSort = this.actions.pipe(
    ofType(DataActions.ActionTypes.SaveSortBegin),
    mergeMap((action: any) =>
      this.sortService.saveSortData(action.payload.data).pipe(
        map((data: SortData[]) => {
          return new DataActions.SaveSortSuccess({ data: data });
        }),
        catchError((error) => {
          return of(new DataActions.SaveSortFailure(error));
        })
      )
    )
  );
}
