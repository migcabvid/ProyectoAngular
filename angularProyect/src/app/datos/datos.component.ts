import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent {
  selectedEntity: 'usuario' | 'profesor' | 'alumno' | null = null;
  listarResult: any;

  createForm: FormGroup;
  updateForm: FormGroup;
  deleteForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Formulario para crear (para 'usuario' se definen los 4 campos)
    this.createForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
    // Formulario para actualizar usuario con los 5 campos requeridos
    this.updateForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
    this.deleteForm = this.fb.group({
      id: ['', Validators.required]
    });
  }

  // Seleccionar la entidad (usuario, profesor o alumno)
  selectEntity(entity: 'usuario' | 'profesor' | 'alumno') {
    this.selectedEntity = entity;
    this.listarResult = null;
  }

  // Obtiene la URL para listar todos los registros según la entidad en plural
  get getAllUrl(): string {
    if (!this.selectedEntity) return '';
    switch (this.selectedEntity) {
      case 'usuario':
        return 'http://localhost:8080/usuarios/';
      case 'profesor':
        return 'http://localhost:8080/profesores/';
      case 'alumno':
        return 'http://localhost:8080/alumnos/';
      default:
        return '';
    }
  }

  // URL base para crear, actualizar y eliminar, usando rutas en plural
  get crudUrl(): string {
    if (!this.selectedEntity) return '';
    switch (this.selectedEntity) {
      case 'usuario':
        return 'http://localhost:8080/usuarios';
      case 'profesor':
        return 'http://localhost:8080/profesores';
      case 'alumno':
        return 'http://localhost:8080/alumnos';
      default:
        return '';
    }
  }

  // Listar todos los registros
  listar() {
    const url = this.getAllUrl;
    if (url) {
      this.http.get(url).subscribe(
        data => {
          this.listarResult = data;
          console.log('Listar:', data);
          alert('Respuesta del backend: ' + JSON.stringify(data));
        },
        error => {
          console.error('Error al listar:', error);
        }
      );
    }
  }

  // Crear un nuevo registro
  create() {
    const url = this.crudUrl;
    if (url && this.createForm.valid) {
      this.http.post(url, this.createForm.value).subscribe(
        data => {
          console.log('Creado:', data);
          alert('Respuesta del backend: ' + JSON.stringify(data));
          this.createForm.reset();
        },
        error => {
          console.error('Error al crear:', error);
          alert('Error al crear: ' + JSON.stringify(error));
        }
      );
    }
  }

  // Actualizar un registro existente enviando el JSON completo
  update() {
    const url = this.crudUrl;
    if (url && this.updateForm.valid) {
      // Construir la URL con el ID, asumiendo que el backend espera /usuarios/{id}
      const updateUrl = `${url}/${this.updateForm.value.id}`;
      this.http.put(updateUrl, this.updateForm.value).subscribe(
        data => {
          console.log('Actualizado:', data);
          alert('Respuesta del backend: ' + JSON.stringify(data));
          this.updateForm.reset();
        },
        error => {
          console.error('Error al actualizar:', error);
          alert('Error al actualizar: ' + JSON.stringify(error));
        }
      );
    }
  }


  // Eliminar un registro (se asume que se pasa el id en la URL)
  delete() {
    const url = this.crudUrl;
    const id = this.deleteForm.value.id;
    if (url && id) {
      this.http.delete(`${url}/${id}`, { responseType: 'text' }).subscribe(
        data => {
          console.log('Eliminado:', data);
          alert('Respuesta del backend: ' + data);
          this.deleteForm.reset();
        },
        error => {
          console.error('Error al eliminar:', error);
          // Extraer únicamente el mensaje de error
          const errorMessage = typeof error.error === 'string' ? error.error : JSON.stringify(error.error);
          alert('Error al eliminar: ' + errorMessage);
        }
      );
    }
  }

}
