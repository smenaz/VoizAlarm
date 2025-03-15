import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit  } from '@angular/core';
import { TableModel, TableHeaderItem, TableItem } from 'carbon-components-angular';
import Edit from "@carbon/icons/es/edit/16";
import TrashCan from "@carbon/icons/es/trash-can/16";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-sonido-eventos-list',
  standalone: false,
  templateUrl: './sonido-eventos-list.component.html',
  styleUrls: ['./sonido-eventos-list.component.css']
})
export class SonidoEventosListComponent {
  listaDeDatos = [
    { id: 1, evento: 'Despertar', sonido: 'Naturaleza' },
    { id: 2, evento: 'Reuniones del trabajo', sonido: 'Marcha' },
    { id: 3, evento: 'Deporte', sonido: 'Mundial 2014' },
    { id: 4, evento: 'Tomar Agua', sonido: 'Olas del Mar' },
    { id: 5, evento: 'Reuniones familiares', sonido: 'Motivación' }
  ];
  title = 'Lista de sonido por eventos';
  subtitle = 'Gestionar la lista de sonidos';

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

  sonidoAEditar: any;
  isEditModalOpen: boolean = false;

  accion: number = 0;
  showConfirmDialog: boolean = false;
  messageConfirmDialog: string = '';
  sonidoSelected: any;

  
  // Referencia al template de la columna "Opciones"
  @ViewChild('customCell', { static: true }) customCell!: TemplateRef<any>;

  ngOnInit() {
    this.cargarDatosEnTabla();
  }
  
  constructor(private sanitizer: DomSanitizer) {
    // Convert the icon object to SVG HTML
    this.editIconHtml = this.iconToSvg(Edit);
    this.trashIconHtml = this.iconToSvg(TrashCan);
    //this.cargarDatosEnTabla()
  }

  cargarDatosEnTabla() {
    this.tableModel.header = [
      new TableHeaderItem({ data: 'Evento' }),
      new TableHeaderItem({ data: 'Sonido' }),
      new TableHeaderItem({ data: 'Opciones' })
    ];

    this.tableModel.data = this.listaDeDatos.map(item => [
      new TableItem({ data: item.evento }),
      new TableItem({ data: item.sonido }),
      new TableItem({ data: item, template: this.customCell })
    ]);
  }
  agregarNuevoSonidoEvento(nuevoSonidoEvento: { id: number, evento: string, sonido: string }) {
    console.log('Recibido nuevo sonido Evento:', nuevoSonidoEvento);
    this.listaDeDatos.push(nuevoSonidoEvento);  // Agregarlo a la lista
    this.cargarDatosEnTabla();  // Refrescar la tabla
    setTimeout(() => {
      this.tableModel.data.forEach(row => {
        row[2] = new TableItem({ data: row, template: this.customCell });
      });
    });
    this.isModalOpen = false;
  }
   // ✅ Asignar el `customCell` después de la inicialización del componente
   ngAfterViewInit() {
    this.tableModel.data.forEach(row => {
      row[2] = new TableItem({ data: row[2].data, template: this.customCell });
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

  
  Delete(rowData: any) {
    if (rowData) {
      console.log("Elemento seleccionado para eliminar:", rowData);
      this.sonidoAEditar = rowData;
      this.isDeleteConfirmModalOpen = true;
    } else {
      console.error("Error: No se recibió data en Delete()");
    }
  }
  
  Edit(rowData: any) {
    if (rowData) {
      console.log("Elemento seleccionado:", rowData);
      console.log("id:",rowData.id)
      console.log("id:",rowData.evento)
   
      this.sonidoAEditar = rowData;
      this.isEditModalOpen = true;
   
    } else {
      console.error("Error: No se recibió data en logData()");
    }
  }
  
  actualizarSonidoEnTabla(sonidoActualizado: any) {
    const index = this.listaDeDatos.findIndex(item => item.id === sonidoActualizado.id);
    if (index !== -1) {
      this.listaDeDatos[index] = sonidoActualizado; // Actualiza en la lista
      this.cargarDatosEnTabla(); // Refresca la tabla
    }
    this.isEditModalOpen = false; // Cierra el modal de edición
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
  cerrarModalModificar():void{
    this.isEditModalOpen = false;
  }

  cerrarEliminarConfirmacion() {
    this.isDeleteConfirmModalOpen = false;
  }

  eliminarSonido() {
    console.log("Ingresando a eliminar sonido:")
    console.log("valor sonidoaEditar:",this.sonidoAEditar)

    if (this.sonidoAEditar) {

      // Filtrar la lista para excluir el elemento seleccionado
      this.listaDeDatos = this.listaDeDatos.filter(item => item.id !== this.sonidoAEditar.id);
      
      // Refrescar la tabla para reflejar los cambios
      this.cargarDatosEnTabla();
  
      console.log(`Elemento con id ${this.sonidoAEditar.id} eliminado`);
    }
  
    // Cierra el modal de confirmación
    this.cerrarEliminarConfirmacion();
  }
  

  abrirEliminarConfirmacion() {
    this.isDeleteConfirmModalOpen = true;
  }

}