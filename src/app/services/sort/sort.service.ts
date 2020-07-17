import { Injectable, Inject } from '@angular/core';

import { SortStorageService } from './sort-storage.service';

@Injectable()
export class SortService {
  constructor(@Inject(SortStorageService) private storage: SortStorageService) {}

  getSortData() {
    return this.storage.get();
  }

  saveSortData(item) {
    return this.storage.post(item);
  }
}
