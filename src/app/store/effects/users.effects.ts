import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { UsersService } from '../../services/users/users.service';
import * as DataActions from '../actions/users.actions';

@Injectable()
export class UsersEffects {
  constructor(private actions: Actions, private usersService: UsersService) {}

  @Effect()
  loadData = this.actions.pipe(
    ofType(DataActions.ActionTypes.LoadUsersBegin),
    switchMap(() => {
      return this.usersService.loadData().pipe(
        map((data) => new DataActions.LoadUsersSuccess({ data: data })),
        catchError((error) =>
          of(new DataActions.LoadUsersFailure({ error: error }))
        )
      );
    })
  );
}
