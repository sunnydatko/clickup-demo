import { Injectable } from '@angular/core';
import { SortData } from '../../interfaces/sort.interface';

const storageName = 'sortData';

const defaultSort = [{ active: null, direction: null }];

@Injectable()
export class SortStorageService {
  private sort: SortData[];

  constructor() {
    this.sort = JSON.parse(localStorage.getItem(storageName)) || defaultSort;
  }

  // get items
  get() {
    return this.sort;
  }

  // update items
  post(sort) {
    this.sort = sort;
    return this.update();
  }

  private update() {
    localStorage.setItem(storageName, JSON.stringify(this.sort));

    return this.get();
  }
}
