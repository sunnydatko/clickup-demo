import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MaterialModule } from './material.module';
import { UsersComponent } from './users/users.component';
import { UsersService } from './services/users/users.service';

@NgModule({
  declarations: [AppComponent, UsersComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
  providers: [UsersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
