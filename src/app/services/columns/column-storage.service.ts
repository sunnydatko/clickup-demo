import { Injectable } from '@angular/core';
import { Column } from '../../interfaces/column.interface';

const storageName = 'columns';

const defaultColumns = [
  { field: 'name', width: 200 },
  { field: 'title', width: 150 },
  { field: 'city', width: 150 },
  { field: 'state', width: 50 },
];

@Injectable()
export class ColumnStorageService {
  private columns: Column[];

  constructor() {
    this.columns =
      JSON.parse(localStorage.getItem(storageName)) || defaultColumns;
  }

  // get items
  get() {
    return [...this.columns];
  }

  // update items
  post(columns) {
    this.columns = columns;
    return this.update();
  }

  private update() {
    localStorage.setItem(storageName, JSON.stringify(this.columns));

    return this.get();
  }
}
