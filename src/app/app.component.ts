import { Component } from '@angular/core';
import { UsersService } from './services/users/users.service';
import { ColumnService } from './services/columns/column.service';
import { SortService } from './services/sort/sort.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private usersService: UsersService,
    private columnService: ColumnService,
    private sortService: SortService
  ) {
    this.usersService.load();
    this.columnService.load();
    this.sortService.load();
  }
}
