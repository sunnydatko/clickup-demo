import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  CdkDragStart,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { Column } from '../../interfaces/column.interface';
import { SortData } from '../../interfaces/sort.interface';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() users: User[];
  @Input() columns: Column[];
  @Input() sortData: SortData[] = [{ active: null, direction: null }];

  @Output() sortChange = new EventEmitter();
  @Output() columnChange = new EventEmitter();

  //table data
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { read: ElementRef }) private matTableRef: ElementRef;
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

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.setupTable();
    this.setDisplayedColumns();
  }

  ngAfterViewInit() {
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.columns) {
      this.columns = changes.columns.currentValue;
      this.setDisplayedColumns();
      if (this.matTableRef) {
        this.setTableResize(this.matTableRef.nativeElement.clientWidth);
      }
    }
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  // }

  getCopy(array) {
    return JSON.parse(JSON.stringify(array));
  }

  dragStarted(event: CdkDragStart, index: number) {
    this.previousIndex = index;
  }

  dropListDropped(event: CdkDropList, index: number) {
    if (event) {
      let tmpColumns = this.getCopy(this.columns);
      moveItemInArray(tmpColumns, this.previousIndex, index);
      this.saveColumns(tmpColumns);
    }
  }

  setDisplayedColumns() {
    let tmpColumns = this.getCopy(this.columns);

    tmpColumns.forEach((column, index) => {
      column.index = index;
      this.displayedColumns[index] = column.field;
    });
  }

  setupTable() {
    this.dataSource = new MatTableDataSource(this.users);
    this.sort.active = this.sortData[0].active;
    this.sort.direction = this.sortData[0].direction;
    this.dataSource.sort = this.sort;
  }

  setTableResize(tableWidth: number) {
    let tmpColumns = this.getCopy(this.columns);
    let totWidth = 0;

    tmpColumns.forEach((column) => {
      totWidth += column.width;
    });
    const scale = (tableWidth - 5) / totWidth;
    tmpColumns.forEach((column) => {
      column.width *= scale;
      this.setColumnWidth(column);
    });
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
    let tmpColumns = this.getCopy(this.columns);

    const orgWidth = this.columns[index].width;
    const dx = width - orgWidth;
    if (dx !== 0) {
      const j = this.isResizingRight ? index + 1 : index - 1;
      const newWidth = this.columns[j].width - dx;
      if (newWidth > 50) {
        tmpColumns[index].width = width;
        this.setColumnWidth(tmpColumns[index]);
        tmpColumns[j].width = newWidth;
        this.setColumnWidth(tmpColumns[j]);
      }
    }

    this.saveColumns(tmpColumns);
  }

  setColumnWidth(column: any) {
    const columnEls = Array.from(
      document.getElementsByClassName('mat-column-' + column.field)
    );
    columnEls.forEach((el: HTMLDivElement) => {
      el.style.width = column.width + 'px';
    });
  }

  saveColumns(columns): void {
    this.columnChange.emit(columns);
  }

  saveSortData(event): void {
    let sortData = [{ active: event.active, direction: event.direction }];
    this.sortChange.emit(sortData);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }
}
