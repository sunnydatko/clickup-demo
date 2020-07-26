import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { ColumnStorageService } from './column-storage.service';
import * as DataActions from '../../store/actions/column.actions';
import { AppState, getAllColumns, getColumnsState } from '../../store/reducers';

@Injectable()
export class ColumnService {
  constructor(
    @Inject(ColumnStorageService) private storage: ColumnStorageService,
    private store: Store<AppState>
  ) {}

  loadData() {
    return of(this.storage.get());
  }

  load() {
    this.store.dispatch(new DataActions.LoadColumnsBegin());
  }

  getData() {
    return this.store.select(getColumnsState);
  }

  getColumnData() {
    return this.store.select(getAllColumns);
  }

  saveColumns(item) {
    return of(this.storage.post(item));
  }
}
