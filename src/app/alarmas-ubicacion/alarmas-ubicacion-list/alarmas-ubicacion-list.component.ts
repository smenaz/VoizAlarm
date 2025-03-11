import { Component } from '@angular/core';
import { TableModel, TableHeaderItem, TableItem } from 'carbon-components-angular';

@Component({
  selector: 'app-alarmas-ubicacion-list',
  standalone: false,
  templateUrl: './alarmas-ubicacion-list.component.html',
  styleUrls: ['./alarmas-ubicacion-list.component.css']
})
export class AlarmasUbicacionListComponent {
  title = 'Lista de alarmas con ubicaciones';
  subtitle = 'Gestionar la lista de ubicaciones';

  tableModel = new TableModel();
  searchModel: string = '';

  currentPage = 1;
  pageSize = 5;

  constructor() {
    // Definir encabezados de la tabla usando TableHeaderItem
    this.tableModel.header = [
      new TableHeaderItem({ data: 'Nombre' }),
      new TableHeaderItem({ data: 'Ubicación' }),
      new TableHeaderItem({ data: 'Opciones' })
    ];

    // Definir datos de la tabla usando TableItem
    this.tableModel.data = [
      [
        new TableItem({ data: 'Casa' }),
        new TableItem({ data: 'lat 10.838383, long 19.7373' }),
        new TableItem({ data: '' })
      ],
      [
        new TableItem({ data: 'Trabajo' }),
        new TableItem({ data: 'Marcha' }),
        new TableItem({ data: '' })
      ],
      [
        new TableItem({ data: 'Gym' }),
        new TableItem({ data: 'Mundial 2014' }),
        new TableItem({ data: '' })
      ],
      [
        new TableItem({ data: 'Escuela' }),
        new TableItem({ data: 'Olas del Mar' }),
        new TableItem({ data: '' })
      ],
      [
        new TableItem({ data: 'Curso' }),
        new TableItem({ data: 'Motivación' }),
        new TableItem({ data: '' })
      ]
    ];
  }

  updateTableData() {
    /*const startIndex = (this.currentPage - 1) * this.pageSize;
    const paginatedData = this.alarmas.slice(startIndex, startIndex + this.pageSize);

    this.tableModel.data = paginatedData.map(alarm => [
      new TableItem({ data: alarm.nombre }),
      new TableItem({ data: alarm.ubicacion }),
      new TableItem({ data: '' }) // Aquí puedes agregar botones de acción si los necesitas
    ]);

    this.tableModel.totalDataLength = this.alarmas.length;*/
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updateTableData();
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.currentPage = 1; // Reiniciar a la primera página cuando cambia el tamaño
    this.updateTableData();
  }

  openCreateModal(): void {
    console.log('Abrir modal para crear nueva alarma');
  }

  onAlarmaCreated(): void {
    console.log('Nueva alarma creada');
  }

  selectPage(evento: Object): void {

  }

}