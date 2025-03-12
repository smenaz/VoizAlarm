import { Component, ViewChild, TemplateRef, AfterViewInit  } from '@angular/core';
import { TableModel, TableHeaderItem, TableItem } from 'carbon-components-angular';
import Edit from "@carbon/icons/es/edit/16";
import TrashCan from "@carbon/icons/es/trash-can/16";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


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

  // ✅ Definir los iconos como variables
  editIconHtml: SafeHtml = Object;
  trashIconHtml: SafeHtml = Object;
  editIcon = Edit?.elem || Edit?.svgData?.elem || Edit;
  trashIcon = TrashCan?.elem || TrashCan?.svgData?.elem || TrashCan;

  isModalOpen: boolean = false;
  size = 'md';
  isDeleteConfirmModalOpen: boolean = false;

  // Referencia al template de la columna "Opciones"
  @ViewChild('customCell', { static: true }) customCell!: TemplateRef<any>;

  constructor(private sanitizer: DomSanitizer) {
    // Convert the icon object to SVG HTML
    this.editIconHtml = this.iconToSvg(Edit);
    this.trashIconHtml = this.iconToSvg(TrashCan);

    // Definir encabezados de la tabla usando TableHeaderItem
    this.tableModel.header = [
      new TableHeaderItem({ data: 'Nombre' }),
      new TableHeaderItem({ data: 'Ubicación' }),
      new TableHeaderItem({ data: 'Opciones'})
    ];

    // Definir datos de la tabla
    this.tableModel.data = [
      [ new TableItem({ data: 'Casa' }), new TableItem({ data: 'lat 10.838383, long 19.7373' }), new TableItem({ data: null }) ],
      [ new TableItem({ data: 'Trabajo' }), new TableItem({ data: 'Marcha' }), new TableItem({ data: null }) ],
      [ new TableItem({ data: 'Gym' }), new TableItem({ data: 'Mundial 2014' }), new TableItem({ data: null }) ],
      [ new TableItem({ data: 'Escuela' }), new TableItem({ data: 'Olas del Mar' }), new TableItem({ data: null }) ],
      [ new TableItem({ data: 'Curso' }), new TableItem({ data: 'Motivación' }), new TableItem({ data: null }) ]
    ];
  
  }

   // ✅ Asignar el `customCell` después de la inicialización del componente
   ngAfterViewInit() {
    this.tableModel.data.forEach(row => {
      row[2] = new TableItem({ data: row, template: this.customCell });
    });
  }

  updateTableData() {
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

  edit(object: Object): void {

  }

  delete(object: Object): void {

  }

  // Helper method to convert Carbon icon object to SVG HTML string
  private iconToSvg(icon: any): SafeHtml {
    if (!icon || !icon.elem) return '';
    
    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    
    // Add attributes
    if (icon.attrs) {
      Object.keys(icon.attrs).forEach((key: string) => {
        svg.setAttribute(key, icon.attrs[key]);
      });
    }
    
    // Add content (paths, etc.)
    if (icon.content && Array.isArray(icon.content)) {
      icon.content.forEach((item: any) => {
        if (item.elem && item.attrs) {
          const element = document.createElementNS('http://www.w3.org/2000/svg', item.elem);
          Object.keys(item.attrs).forEach((key: string) => {
            element.setAttribute(key, item.attrs[key]);
          });
          svg.appendChild(element);
        }
      });
    }
    
    // Convert to string and sanitize
    const svgString = new XMLSerializer().serializeToString(svg);
    return this.sanitizer.bypassSecurityTrustHtml(svgString);
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  cerrarEliminarConfirmacion() {
    this.isDeleteConfirmModalOpen = false;
  }

  eliminarAlarma() {
    console.log('Ubicación eliminada');
    this.cerrarEliminarConfirmacion(); // Cierra modal tras confirmar
  }

  abrirEliminarConfirmacion() {
    this.isDeleteConfirmModalOpen = true;
  }

}