import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  CdkDragStart,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Column } from '../interfaces/column.interface';
import { SortData } from '../interfaces/sort.interface';
import { User } from '../interfaces/user.interface';
import { ColumnService } from '../services/columns/column.service';
import { SortService } from '../services/sort/sort.service';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
  users: User[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  //table data
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { read: ElementRef }) private matTableRef: ElementRef;
  columns: Column[];
  sortData: SortData = { active: null, direction: null };
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource(this.users);

  // reordering columns
  previousIndex: number;

  // resizing
  pressed = false;
  currentResizeIndex: number;
  startX: number;
  startWidth: number;
  isResizingRight: boolean;
  resizableMousemove: () => void;
  resizableMouseup: () => void;

  constructor(
    private renderer: Renderer2,
    private columnService: ColumnService,
    private sortService: SortService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.setupData();
    this.setupTable();
    this.setDisplayedColumns();
  }

  ngAfterViewInit() {
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.saveColumns();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }

  dragStarted(event: CdkDragStart, index: number) {
    this.previousIndex = index;
  }

  dropListDropped(event: CdkDropList, index: number) {
    if (event) {
      moveItemInArray(this.columns, this.previousIndex, index);
      this.setDisplayedColumns();
      this.setTableResize(this.matTableRef.nativeElement.clientWidth);
      location.reload();
    }
  }

  setDisplayedColumns() {
    this.columns.forEach((column, index) => {
      column.index = index;
      this.displayedColumns[index] = column.field;
    });
  }

  setupData() {
    this.usersService
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.users = data;
      });
  }

  setupTable() {
    this.dataSource = new MatTableDataSource(this.users);
    this.columns = this.columnService.getColumnsList();
    this.sortData = this.sortService.getSortData();
    this.sort.active = this.sortData.active;
    this.sort.direction = this.sortData.direction;
    this.dataSource.sort = this.sort;
  }

  setTableResize(tableWidth: number) {
    let totWidth = 0;
    this.columns.forEach((column) => {
      totWidth += column.width;
    });
    const scale = (tableWidth - 5) / totWidth;
    this.columns.forEach((column) => {
      column.width *= scale;
      this.setColumnWidth(column);
    });
    this.saveColumns();
  }

  onResizeColumn(event: any, index: number) {
    this.checkResizing(event, index);
    this.currentResizeIndex = index;
    this.pressed = true;
    this.startX = event.pageX;
    this.startWidth = event.target.clientWidth;
    this.mouseMove(index);
  }

  private checkResizing(event, index) {
    const cellData = this.getCellData(index);
    if (
      index === 0 ||
      (Math.abs(event.pageX - cellData.right) < cellData.width / 2 &&
        index !== this.columns.length - 1)
    ) {
      this.isResizingRight = true;
    } else {
      this.isResizingRight = false;
    }
  }

  private getCellData(index: number) {
    const headerRow = this.matTableRef.nativeElement.children[0];
    const cell = headerRow.children[index];
    return cell.getBoundingClientRect();
  }

  mouseMove(index: number) {
    this.resizableMousemove = this.renderer.listen(
      'document',
      'mousemove',
      (event) => {
        if (this.pressed && event.buttons) {
          const dx = this.isResizingRight
            ? event.pageX - this.startX
            : -event.pageX + this.startX;
          const width = this.startWidth + dx;
          if (this.currentResizeIndex === index && width > 50) {
            this.setColumnWidthChanges(index, width);
          }
        }
      }
    );
    this.resizableMouseup = this.renderer.listen(
      'document',
      'mouseup',
      (event) => {
        if (this.pressed) {
          this.pressed = false;
          this.currentResizeIndex = -1;
          this.resizableMousemove();
          this.resizableMouseup();
        }
      }
    );
  }

  setColumnWidthChanges(index: number, width: number) {
    const orgWidth = this.columns[index].width;
    const dx = width - orgWidth;
    if (dx !== 0) {
      const j = this.isResizingRight ? index + 1 : index - 1;
      const newWidth = this.columns[j].width - dx;
      if (newWidth > 50) {
        this.columns[index].width = width;
        this.setColumnWidth(this.columns[index]);
        this.columns[j].width = newWidth;
        this.setColumnWidth(this.columns[j]);
      }
    }
  }

  setColumnWidth(column: any) {
    const columnEls = Array.from(
      document.getElementsByClassName('mat-column-' + column.field)
    );
    columnEls.forEach((el: HTMLDivElement) => {
      el.style.width = column.width + 'px';
    });
  }

  saveColumns(): void {
    this.columns = this.columnService.saveColumns(this.columns);
  }

  saveSortData(event): void {
    let sortData = { active: event.active, direction: event.direction };
    this.sortData = this.sortService.saveSortData(sortData);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }
}
