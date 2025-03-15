import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface Ubicacion {
  nombre: string;
  ubicacion: string;
}

@Component({
  selector: 'app-data-table',
  standalone: false,
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {
  @Input() data: Ubicacion[] = [];
  @Input() columns: string[] = [];
  @Input() title: string = '';  // <-- Se agregaron inputs para título y subtítulo
  @Input() subtitle: string = '';

  dataSource = new MatTableDataSource<Ubicacion>(this.data);
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
    this.displayedColumns = this.columns;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(row: Ubicacion) {
    console.log('Editar:', row);
  }

  delete(row: Ubicacion) {
    console.log('Eliminar:', row);
    this.dataSource.data = this.dataSource.data.filter(item => item !== row);
  }
}
