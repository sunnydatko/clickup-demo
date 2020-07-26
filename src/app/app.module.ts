import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { MaterialModule } from './material.module';
import { ColumnService } from './services/columns/column.service';
import { ColumnStorageService } from './services/columns/column-storage.service';
import { SortService } from './services/sort/sort.service';
import { SortStorageService } from './services/sort/sort-storage.service';
import { reducers, metaReducers } from './store/reducers';
import { effects } from './store/effects';

@NgModule({
  declarations: [AppComponent, UsersComponent, UsersTableComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    DragDropModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule,
    StorageServiceModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
  ],
  providers: [
    ColumnService,
    ColumnStorageService,
    SortService,
    SortStorageService,
  ],

  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
