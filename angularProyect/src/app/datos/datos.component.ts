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
  // Entidad seleccionada (usuario, profesor, coche o taller). Inicialmente, ninguna.
  selectedEntity: 'usuario' | 'profesor' | 'coche' | 'taller' | null = null;
  // Variable para almacenar la respuesta del listado
  listarResult: any;

  // ===================== Formularios para USUARIO =====================
  usuarioCreateForm: FormGroup;
  usuarioUpdateForm: FormGroup;
  usuarioDeleteForm: FormGroup;

  // ===================== Formularios para COCHE =====================
  cocheCreateForm: FormGroup;
  cocheUpdateForm: FormGroup;
  cocheDeleteForm: FormGroup;

  // ===================== Formularios para TALLER =====================
  tallerCreateForm: FormGroup;
  tallerUpdateForm: FormGroup;
  tallerDeleteForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // ----------------- Formulario para crear USUARIO -----------------
    this.usuarioCreateForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });

    // ----------------- Formulario para actualizar USUARIO -----------------
    this.usuarioUpdateForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });

    // ----------------- Formulario para eliminar USUARIO -----------------
    this.usuarioDeleteForm = this.fb.group({
      id: ['', Validators.required]
    });

    // ----------------- Formulario para crear COCHE -----------------
    this.cocheCreateForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      matricula: ['', Validators.required],
      color: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]]
    });

    // ----------------- Formulario para actualizar COCHE -----------------
    this.cocheUpdateForm = this.fb.group({
      id: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      matricula: ['', Validators.required],
      color: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]]
    });

    // ----------------- Formulario para eliminar COCHE -----------------
    this.cocheDeleteForm = this.fb.group({
      id: ['', Validators.required]
    });

    // ----------------- Formulario para crear TALLER -----------------
    this.tallerCreateForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.maxLength(15)]],
      capacidad: [1, [Validators.required, Validators.min(1)]],
      horario: ['', Validators.required]
    });

    // ----------------- Formulario para actualizar TALLER -----------------
    this.tallerUpdateForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.maxLength(15)]],
      capacidad: [1, [Validators.required, Validators.min(1)]],
      horario: ['', Validators.required]
    });

    // ----------------- Formulario para eliminar TALLER -----------------
    this.tallerDeleteForm = this.fb.group({
      id: ['', Validators.required]
    });
  }

  // ----------------- Seleccionar la entidad que se va a gestionar -----------------
  selectEntity(entity: 'usuario' | 'profesor' | 'coche' | 'taller') {
    this.selectedEntity = entity; // Se asigna la entidad seleccionada
    this.listarResult = null;     // Se reinicia el resultado del listado
  }

  // Devuelve la URL base para las operaciones CRUD según la entidad seleccionada.
  get crudUrl(): string {
    if (!this.selectedEntity) return '';
    // Se asume que la API pluraliza la entidad añadiendo una 's'
    return `http://localhost:8080/${this.selectedEntity}s`;
  }

  // URL para listar registros (igual que crudUrl en este caso).
  get getAllUrl(): string {
    return this.crudUrl;
  }

  // ----------------- Método para listar registros del backend -----------------
  listar() {
    if (this.getAllUrl) {
      // Se realiza una petición GET a la URL definida
      this.http.get(this.getAllUrl).subscribe(
        data => {
          this.listarResult = data;  // Se guardan los datos recibidos
          console.log('Listar:', data);
          alert('Respuesta del backend: ' + JSON.stringify(data));
        },
        error => {
          console.error('Error al listar:', error);
        }
      );
    }
  }

  // ===================== CRUD PARA USUARIO =====================

  // Crea un nuevo usuario mediante petición POST.
  createUsuario() {
    if (this.crudUrl && this.usuarioCreateForm.valid) {
      // Se envían los datos del formulario al backend.
      this.http.post(this.crudUrl, this.usuarioCreateForm.value).subscribe(
        data => {
          console.log('Usuario creado:', data);
          alert('Usuario creado exitosamente: ' + JSON.stringify(data));
          this.usuarioCreateForm.reset(); // Se limpia el formulario tras la creación
        },
        error => {
          console.error('Error al crear usuario:', error);
          alert('Error al crear usuario: ' + JSON.stringify(error));
        }
      );
    }
  }

  // Actualiza un usuario existente mediante petición PUT.
  updateUsuario() {
    if (this.crudUrl && this.usuarioUpdateForm.valid) {
      // Construye la URL para la actualización usando el ID del usuario.
      const updateUrl = `${this.crudUrl}/${this.usuarioUpdateForm.value.id}`;
      this.http.put(updateUrl, this.usuarioUpdateForm.value).subscribe(
        data => {
          console.log('Usuario actualizado:', data);
          alert('Usuario actualizado exitosamente: ' + JSON.stringify(data));
          this.usuarioUpdateForm.reset(); // Se limpia el formulario tras la actualización
        },
        error => {
          console.error('Error al actualizar usuario:', error);
          alert('Error al actualizar usuario: ' + JSON.stringify(error));
        }
      );
    }
  }

  // Elimina un usuario mediante petición DELETE.
  deleteUsuario() {
    const id = this.usuarioDeleteForm.value.id;
    if (this.crudUrl && id) {
      // Se construye la URL con el ID y se realiza la petición DELETE
      this.http.delete(`${this.crudUrl}/${id}`, { responseType: 'text' }).subscribe({
        next: data => {
          console.log('Usuario eliminado:', data);
          alert('Usuario eliminado exitosamente: ' + data);
          this.usuarioDeleteForm.reset(); // Se limpia el formulario tras la eliminación
        },
        error: error => {
          console.error('Error al eliminar usuario:', error);
          alert('Error al eliminar usuario: ' + (typeof error.error === 'string' ? error.error : JSON.stringify(error.error)));
        }
      });
    }
  }

  // ===================== CRUD PARA COCHE =====================

  // Crea un nuevo coche mediante petición POST.
  createCoche() {
    if (this.crudUrl && this.cocheCreateForm.valid) {
      // Se envían los datos del formulario de coche al backend.
      this.http.post(this.crudUrl, this.cocheCreateForm.value).subscribe(
        data => {
          console.log('Coche creado:', data);
          alert('Coche creado exitosamente: ' + JSON.stringify(data));
          this.cocheCreateForm.reset(); // Se reinicia el formulario
        },
        error => {
          console.error('Error al crear coche:', error);
          alert('Error al crear coche: ' + JSON.stringify(error));
        }
      );
    }
  }

  // Actualiza un coche existente mediante petición PUT.
  updateCoche() {
    if (this.crudUrl && this.cocheUpdateForm.valid) {
      // Se construye la URL de actualización con el ID del coche.
      const updateUrl = `${this.crudUrl}/${this.cocheUpdateForm.value.id}`;
      this.http.put(updateUrl, this.cocheUpdateForm.value).subscribe(
        data => {
          console.log('Coche actualizado:', data);
          alert('Coche actualizado exitosamente: ' + JSON.stringify(data));
          this.cocheUpdateForm.reset(); // Se limpia el formulario
        },
        error => {
          console.error('Error al actualizar coche:', error);
          alert('Error al actualizar coche: ' + JSON.stringify(error));
        }
      );
    }
  }

  // Elimina un coche mediante petición DELETE.
  deleteCoche() {
    const id = this.cocheDeleteForm.value.id;
    if (this.crudUrl && id) {
      // Se realiza la petición DELETE a la URL construida con el ID del coche.
      this.http.delete(`${this.crudUrl}/${id}`, { responseType: 'text' }).subscribe(
        data => {
          console.log('Coche eliminado:', data);
          alert('Coche eliminado exitosamente: ' + data);
          this.cocheDeleteForm.reset(); // Se limpia el formulario tras la eliminación
        },
        error => {
          console.error('Error al eliminar coche:', error);
          alert('Error al eliminar coche: ' + (typeof error.error === 'string' ? error.error : JSON.stringify(error.error)));
        }
      );
    }
  }

  // ===================== CRUD PARA TALLER =====================

  // Crea un nuevo taller mediante petición POST.
  createTaller() {
    if (this.crudUrl && this.tallerCreateForm.valid) {
      // Se envían los datos del formulario de taller al backend.
      this.http.post(this.crudUrl, this.tallerCreateForm.value).subscribe(
        data => {
          console.log('Taller creado:', data);
          alert('Taller creado exitosamente: ' + JSON.stringify(data));
          this.tallerCreateForm.reset(); // Se limpia el formulario
        },
        error => {
          console.error('Error al crear taller:', error);
          alert('Error al crear taller: ' + JSON.stringify(error));
        }
      );
    }
  }

  // Actualiza un taller existente mediante petición PUT.
  updateTaller() {
    if (this.crudUrl && this.tallerUpdateForm.valid) {
      // Se construye la URL para actualizar el taller usando su ID.
      const updateUrl = `${this.crudUrl}/${this.tallerUpdateForm.value.id}`;
      this.http.put(updateUrl, this.tallerUpdateForm.value).subscribe(
        data => {
          console.log('Taller actualizado:', data);
          alert('Taller actualizado exitosamente: ' + JSON.stringify(data));
          this.tallerUpdateForm.reset(); // Se limpia el formulario
        },
        error => {
          console.error('Error al actualizar taller:', error);
          alert('Error al actualizar taller: ' + JSON.stringify(error));
        }
      );
    }
  }

  // Elimina un taller mediante petición DELETE.
  deleteTaller() {
    const id = this.tallerDeleteForm.value.id;
    if (this.crudUrl && id) {
      // Se realiza la petición DELETE a la URL construida con el ID del taller.
      this.http.delete(`${this.crudUrl}/${id}`, { responseType: 'text' }).subscribe(
        data => {
          console.log('Taller eliminado:', data);
          alert('Taller eliminado exitosamente: ' + data);
          this.tallerDeleteForm.reset(); // Se limpia el formulario
        },
        error => {
          console.error('Error al eliminar taller:', error);
          alert('Error al eliminar taller: ' + (typeof error.error === 'string' ? error.error : JSON.stringify(error.error)));
        }
      );
    }
  }
}