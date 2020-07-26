import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { SortStorageService } from './sort-storage.service';
import * as DataActions from '../../store/actions/sort.actions';
import { AppState, getAllSortData, getSortState } from '../../store/reducers';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  constructor(
    @Inject(SortStorageService) private storage: SortStorageService,
    private store: Store<AppState>
  ) {}

  loadData() {
    return of(this.storage.get());
  }

  load() {
    this.store.dispatch(new DataActions.LoadSortBegin());
  }

  getData() {
    return this.store.select(getSortState);
  }

  getSortData() {
    return this.store.select(getAllSortData);
  }

  saveSortData(item) {
    return of(this.storage.post(item));
  }
}
