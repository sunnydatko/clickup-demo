import { Injectable, Inject } from '@angular/core';

import { ColumnStorageService } from './column-storage.service';

@Injectable()
export class ColumnService {
  constructor(@Inject(ColumnStorageService) private storage: ColumnStorageService) {}

  getColumnsList() {
    return this.storage.get();
  }

  saveColumns(item) {
    return this.storage.post(item);
  }
}
