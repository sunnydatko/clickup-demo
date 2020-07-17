import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ColumnStorageService } from './services/columns/column-storage.service';
import { ColumnService } from './services/columns/column.service';
import { SortStorageService } from './services/sort/sort-storage.service';
import { SortService } from './services/sort/sort.service';
import { UsersComponent } from './users/users.component';
import { UsersService } from './services/users/users.service';

@NgModule({
  declarations: [AppComponent, UsersComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    DragDropModule,
    FlexLayoutModule,
    MaterialModule,
    StorageServiceModule,
  ],
  providers: [
    ColumnService,
    ColumnStorageService,
    SortStorageService,
    SortService,
    UsersService
  ],

  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
