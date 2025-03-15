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
  
  // Lista de datos con nombre y ubicación
 listaDeUbicaciones = [
    { id: 1, nombre: 'Casa', ubicacion: '10.838383, 19.7373' },
    { id: 2, nombre: 'Trabajo', ubicacion: '19.430919677858906, -99.1198574989767' },
    { id: 3, nombre: 'Gym', ubicacion: '19.43399544675218, -99.142252828539' },
    { id: 4, nombre: 'Escuela', ubicacion: '19.435695188780297, -99.15280694936722' },
    { id: 5, nombre: 'Curso', ubicacion: '19.420437343798202, -99.01077462649602' }
  ];

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
  alarmaAEditar: any;
  isModalOpenEdit: boolean = false;

  ngOnInit() {
    this.cargarDatosEnTabla();
  }

  // Referencia al template de la columna "Opciones"
  @ViewChild('customCell', { static: true }) customCell!: TemplateRef<any>;

  constructor(private sanitizer: DomSanitizer) {
    // Convert the icon object to SVG HTML
    this.editIconHtml = this.iconToSvg(Edit);
    this.trashIconHtml = this.iconToSvg(TrashCan);

   
  
  }

  cargarDatosEnTabla() {

     // Definir encabezados de la tabla usando TableHeaderItem
     this.tableModel.header = [
      new TableHeaderItem({ data: 'ID' }),
      new TableHeaderItem({ data: 'Nombre' }),
      new TableHeaderItem({ data: 'Ubicación' }),
      new TableHeaderItem({ data: 'Opciones'})
    ];

    // Definir datos de la tabla de manera dinámica
    this.tableModel.data = this.listaDeUbicaciones.map(item => [
      new TableItem({ data: item.id }),
      new TableItem({ data: item.nombre }),
      new TableItem({ data: item.ubicacion }),
      new TableItem({ data: item, template: this.customCell }),
     
       // Puedes agregar un botón o acciones aquí
    ]);

  }

   // ✅ Asignar el `customCell` después de la inicialización del componente
   ngAfterViewInit() {
    this.tableModel.data.forEach(row => {
      row[3] = new TableItem({ data: row, template: this.customCell });
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

  onAlarmaCreated(nuevaAlarma: {  id: number, nombre: string, ubicacion: string}) {
    console.log('Recibido nueva alarma de Evento:', nuevaAlarma);
    const nuevoId = this.listaDeUbicaciones.length > 0 
    ? Math.max(...this.listaDeUbicaciones.map(item => item.id)) + 1 
    : 1;
    nuevaAlarma.id = nuevoId
    this.listaDeUbicaciones.push(nuevaAlarma);  // Agregarlo a la lista
    this.cargarDatosEnTabla();  // Refrescar la tabla
    setTimeout(() => {
      this.tableModel.data.forEach(row => {
        row[3] = new TableItem({ data: row, template: this.customCell });
      });
    });
    this.isModalOpen = false;
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
    console.log("✅ Cerrando modal de edición");
    this.isModalOpenEdit = false; // ✅ Asegurar que el modal se cierra
    this.alarmaAEditar = null; // ✅ Limpiar la variable para evitar que el modal se reabra automáticamente
  }

  eliminarAlarma() {
    console.log("Ingresando a eliminar sonido:")
    console.log("valor sonidoaEditar:",this.alarmaAEditar)

    if (this.alarmaAEditar) {

      // Filtrar la lista para excluir el elemento seleccionado
      this.listaDeUbicaciones = this.listaDeUbicaciones.filter(item => item.id !== this.alarmaAEditar.id);
      
      // Refrescar la tabla para reflejar los cambios
      this.cargarDatosEnTabla();
  
      console.log(`Elemento con id ${this.alarmaAEditar.id} eliminado`);
    }
  
    // Cierra el modal de confirmación
    this.cerrarEliminarConfirmacion();
  }
  cerrarEliminarConfirmacion(): void {
    this.isDeleteConfirmModalOpen = false;
  }

  abrirEliminarConfirmacion(rowData: any) {
    console.log("Elemento seleccionado para eliminar:", rowData);
    if (rowData) {
      console.log("Elemento seleccionado para eliminar:", rowData);
      this.alarmaAEditar = rowData;
      this.isDeleteConfirmModalOpen = true;

    } else {
      console.error("Error: No se recibió data en Delete()");
    }
  }

  agregarNuevaAlarma(nuevaAlarma: {  id: number, nombre: string, ubicacion: string}) {
    console.log('Recibido nuevo sonido Evento:', nuevaAlarma);
    const nuevoId = this.listaDeUbicaciones.length > 0 
    ? Math.max(...this.listaDeUbicaciones.map(item => item.id)) + 1 
    : 1;
    nuevaAlarma.id = nuevoId
    this.listaDeUbicaciones.push(nuevaAlarma);  // Agregarlo a la lista
    this.cargarDatosEnTabla();  // Refrescar la tabla
    setTimeout(() => {
      this.tableModel.data.forEach(row => {
        row[3] = new TableItem({ data: row, template: this.customCell });
      });
    });
    this.isModalOpen = false;
  }

  editarNuevaAlarma(nuevaAlarma: { id: number, nombre: string, ubicacion: string }) {
    console.log('🔄 Editando alarma existente:', nuevaAlarma);
  
    // Buscar la alarma en la lista original y actualizarla
    const index = this.listaDeUbicaciones.findIndex(item => item.id === nuevaAlarma.id);
  
    if (index !== -1) {
      // ✅ Actualizar la alarma en la lista en lugar de agregar una nueva
      this.listaDeUbicaciones[index] = { ...nuevaAlarma };
    } else {
      console.warn("⚠️ No se encontró la alarma para actualizar.");
    }
  
    this.cargarDatosEnTabla(); // ✅ Refrescar la tabla
  
    setTimeout(() => {
      this.tableModel.data.forEach(row => {
        row[3] = new TableItem({ data: row, template: this.customCell });
      });
    });
  
    this.isModalOpenEdit = false; // ✅ Asegurar que el modal de edición se cierra correctamente
  }
  
  editarAlarmaOpenModal(rowData: any): void {
    console.log("📌 RowData recibido:", rowData);

    if (!rowData) {
        console.error('❌ No se recibió rowData, no se abrirá el modal.');
        return;
    }

    if (Array.isArray(rowData)) {
        console.log('📌 rowData recibido como array, extrayendo datos...');

        const id = rowData[0]?.data; // El ID parece estar en la posición 0
        const nombre = rowData[1]?.data; // El nombre parece estar en la posición 1
        const ubicacion = rowData[2]?.data; // Ubicación debería estar en la posición 2

        console.log('📌 Extraído -> ID:', id, 'Nombre:', nombre, 'Ubicación:', ubicacion);

        if (!id || !nombre || !ubicacion) {
            console.error('❌ Datos incompletos en rowData:', rowData);
            return;
        }

        rowData = { id, nombre, ubicacion };
    }

    console.log('📌 Enviando al hijo:', rowData);
    this.isModalOpenEdit = true;
    this.alarmaAEditar = rowData;
}

  
  

actualizarAlarmaEnTabla(alarmaActualizada: { id: number, nombre: string, ubicacion: string }) {
  console.log('🔄 Recibido evento alarmaUpdated:', alarmaActualizada);

  const index = this.listaDeUbicaciones.findIndex(item => item.id === alarmaActualizada.id);
  if (index !== -1) {
    this.listaDeUbicaciones[index] = alarmaActualizada;
    this.cargarDatosEnTabla();
  }

  this.closeModal(); // ✅ Asegurar que el modal se cierra después de actualizar
}
  

closeModalUpdate(): void {
  console.log("✅ Cerrando modal de edición");
  this.isModalOpenEdit = false;
}

}