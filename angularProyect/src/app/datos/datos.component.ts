import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent {
  selectedEntity: 'usuario' | 'profesor' | 'coche' | 'taller' | null = null;
  listarResult: any;

  // Formularios para Usuario
  usuarioCreateForm: FormGroup;
  usuarioUpdateForm: FormGroup;
  usuarioDeleteForm: FormGroup;

  // Formularios para Coche
  cocheCreateForm: FormGroup;
  cocheUpdateForm: FormGroup;
  cocheDeleteForm: FormGroup;

  // Formularios para Taller
  tallerCreateForm: FormGroup;
  tallerUpdateForm: FormGroup;
  tallerDeleteForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // ======================= FORMULARIOS PARA USUARIO =======================
    this.usuarioCreateForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });

    this.usuarioUpdateForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });

    this.usuarioDeleteForm = this.fb.group({
      id: ['', Validators.required]
    });

    // ======================= FORMULARIOS PARA COCHE =======================
    this.cocheCreateForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      matricula: ['', Validators.required],
      color: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]]
    });

    this.cocheUpdateForm = this.fb.group({
      id: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      matricula: ['', Validators.required],
      color: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]]
    });

    this.cocheDeleteForm = this.fb.group({
      id: ['', Validators.required]
    });


    // ======================= FORMULARIOS PARA TALLER =======================
    this.tallerCreateForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.maxLength(15)]],
      capacidad: [1, [Validators.required, Validators.min(1)]],
      horario: ['', Validators.required]
    });

    this.tallerUpdateForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.maxLength(15)]],
      capacidad: [1, [Validators.required, Validators.min(1)]],
      horario: ['', Validators.required]
    });

    this.tallerDeleteForm = this.fb.group({
      id: ['', Validators.required]
    });
  }

  // ======================= SELECCIÓN DE ENTIDAD =======================
  selectEntity(entity: 'usuario' | 'profesor' | 'coche' | 'taller') {
    this.selectedEntity = entity;
    this.listarResult = null;
  }

  // Obtiene la URL base según la entidad seleccionada
  get crudUrl(): string {
    if (!this.selectedEntity) return '';
    return `http://localhost:8080/${this.selectedEntity}s`; // Pluraliza la entidad
  }

  // Obtiene la URL para listar registros
  get getAllUrl(): string {
    return this.crudUrl;
  }

  // ======================= LISTAR REGISTROS =======================
  listar() {
    if (this.getAllUrl) {
      this.http.get(this.getAllUrl).subscribe(
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

  // ======================= CRUD PARA USUARIO =======================

  // Crear un nuevo usuario
  createUsuario() {
    if (this.crudUrl && this.usuarioCreateForm.valid) {
      this.http.post(this.crudUrl, this.usuarioCreateForm.value).subscribe(
        data => {
          console.log('Usuario creado:', data);
          alert('Usuario creado exitosamente: ' + JSON.stringify(data));
          this.usuarioCreateForm.reset();
        },
        error => {
          console.error('Error al crear usuario:', error);
          alert('Error al crear usuario: ' + JSON.stringify(error));
        }
      );
    }
  }

  // Actualizar un usuario
  updateUsuario() {
    if (this.crudUrl && this.usuarioUpdateForm.valid) {
      const updateUrl = `${this.crudUrl}/${this.usuarioUpdateForm.value.id}`;
      this.http.put(updateUrl, this.usuarioUpdateForm.value).subscribe(
        data => {
          console.log('Usuario actualizado:', data);
          alert('Usuario actualizado exitosamente: ' + JSON.stringify(data));
          this.usuarioUpdateForm.reset();
        },
        error => {
          console.error('Error al actualizar usuario:', error);
          alert('Error al actualizar usuario: ' + JSON.stringify(error));
        }
      );
    }
  }

  // Eliminar un usuario por ID
  deleteUsuario() {
    const id = this.usuarioDeleteForm.value.id;
    if (this.crudUrl && id) {
      this.http.delete(`${this.crudUrl}/${id}`, { responseType: 'text' }).subscribe(
        data => {
          console.log('Usuario eliminado:', data);
          alert('Usuario eliminado exitosamente: ' + data);
          this.usuarioDeleteForm.reset();
        },
        error => {
          console.error('Error al eliminar usuario:', error);
          alert('Error al eliminar usuario: ' + (typeof error.error === 'string' ? error.error : JSON.stringify(error.error)));
        }
      );
    }
  }

  // ======================= CRUD PARA COCHE =======================

  // Crear un nuevo coche
  createCoche() {
    if (this.crudUrl && this.cocheCreateForm.valid) {
      this.http.post(this.crudUrl, this.cocheCreateForm.value).subscribe(
        data => {
          console.log('Coche creado:', data);
          alert('Coche creado exitosamente: ' + JSON.stringify(data));
          this.cocheCreateForm.reset();
        },
        error => {
          console.error('Error al crear coche:', error);
          alert('Error al crear coche: ' + JSON.stringify(error));
        }
      );
    }
  }

  // Actualizar un coche
  updateCoche() {
    if (this.crudUrl && this.cocheUpdateForm.valid) {
      const updateUrl = `${this.crudUrl}/${this.cocheUpdateForm.value.id}`;
      this.http.put(updateUrl, this.cocheUpdateForm.value).subscribe(
        data => {
          console.log('Coche actualizado:', data);
          alert('Coche actualizado exitosamente: ' + JSON.stringify(data));
          this.cocheUpdateForm.reset();
        },
        error => {
          console.error('Error al actualizar coche:', error);
          alert('Error al actualizar coche: ' + JSON.stringify(error));
        }
      );
    }
  }

  // Eliminar un coche por ID
  deleteCoche() {
    const id = this.cocheDeleteForm.value.id;
    if (this.crudUrl && id) {
      this.http.delete(`${this.crudUrl}/${id}`, { responseType: 'text' }).subscribe(
        data => {
          console.log('Coche eliminado:', data);
          alert('Coche eliminado exitosamente: ' + data);
          this.cocheDeleteForm.reset();
        },
        error => {
          console.error('Error al eliminar coche:', error);
          alert('Error al eliminar coche: ' + (typeof error.error === 'string' ? error.error : JSON.stringify(error.error)));
        }
      );
    }
  }

  // ======================= CRUD PARA TALLER =======================

  // Crear un nuevo taller
  createTaller() {
    if (this.crudUrl && this.tallerCreateForm.valid) {
      this.http.post(this.crudUrl, this.tallerCreateForm.value).subscribe(
        data => {
          console.log('Taller creado:', data);
          alert('Taller creado exitosamente: ' + JSON.stringify(data));
          this.tallerCreateForm.reset();
        },
        error => {
          console.error('Error al crear taller:', error);
          alert('Error al crear taller: ' + JSON.stringify(error));
        }
      );
    }
  }

  // Actualizar un taller
  updateTaller() {
    if (this.crudUrl && this.tallerUpdateForm.valid) {
      const updateUrl = `${this.crudUrl}/${this.tallerUpdateForm.value.id}`;
      this.http.put(updateUrl, this.tallerUpdateForm.value).subscribe(
        data => {
          console.log('Taller actualizado:', data);
          alert('Taller actualizado exitosamente: ' + JSON.stringify(data));
          this.tallerUpdateForm.reset();
        },
        error => {
          console.error('Error al actualizar taller:', error);
          alert('Error al actualizar taller: ' + JSON.stringify(error));
        }
      );
    }
  }

  // Eliminar un taller por ID
  deleteTaller() {
    const id = this.tallerDeleteForm.value.id;
    if (this.crudUrl && id) {
      this.http.delete(`${this.crudUrl}/${id}`, { responseType: 'text' }).subscribe(
        data => {
          console.log('Taller eliminado:', data);
          alert('Taller eliminado exitosamente: ' + data);
          this.tallerDeleteForm.reset();
        },
        error => {
          console.error('Error al eliminar taller:', error);
          alert('Error al eliminar taller: ' + (typeof error.error === 'string' ? error.error : JSON.stringify(error.error)));
        }
      );
    }
  }





}
