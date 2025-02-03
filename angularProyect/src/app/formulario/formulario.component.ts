// Importaciones esenciales de Angular y modulos para formularios reactivos
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})

export class FormularioComponent {

  // Variables
  formulario: FormGroup;
  hoveredField: string = '';
  hoveredField2: string = '';
  hoveredField3: string = '';

  // Variable que referencia al formulario de david y crea un array de imputs direcciones
  formularioDavid = new FormGroup({
    direcciones: new FormArray([this.crearDireccion()])
  });

  constructor(private fb: FormBuilder) {
    // Configuracion del formulario y sus validaciones
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.maxLength(200)]],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      intereses: this.fb.group({
        Angular: [false],
        Quarkus: [false],
        React: [false]
      }),
      direcciones: this.fb.array([this.crearDireccion()]),
      nombreDavid: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  // Getters para acceder a los controles del formulario desde la plantilla
  get nombre() { return this.formulario.get('nombre'); }
  get email() { return this.formulario.get('email'); }
  get mensaje() { return this.formulario.get('mensaje'); }
  get fechaNacimiento() { return this.formulario.get('fechaNacimiento'); }
  get genero() { return this.formulario.get('genero'); }
  get intereses() { return this.formulario.get('intereses'); }
  get nombreDavid() { return this.formulario.get('nombreDavid'); }

  // Metodo para enviar formularios
  enviarFormulario() {
    if (this.formulario.valid) {
      alert('Formulario enviado correctamente ✅');
      console.log(this.formulario.value);
    } else {
      alert('❌ Corrige los errores antes de enviar.');
    }
  }

  // Metodo para crear un nuevo campo de direccion
  crearDireccion(): FormControl {
    return new FormControl('', [Validators.required, Validators.minLength(5)]);
  }

  // Obtener la lista de direcciones
  get direcciones(): FormArray {
    return this.formularioDavid.get('direcciones') as FormArray;
  }

  // Añadir una direccion
  agregarDireccion() {
    this.direcciones.push(this.crearDireccion());
  }

  // Eliminar la ultima direccion
  eliminarDireccion() {
    if (this.direcciones.length > 1) {
      this.direcciones.removeAt(this.direcciones.length - 1);
    }
  }

  onFocus(field: string) { this.hoveredField = `Estás escribiendo en: ${field}`; }
  onMouseOver(field: string) { this.hoveredField = `Mouse sobre: ${field}`; }
  onMouseLeave() { this.hoveredField = ''; }

  onFocus2(field: string) { this.hoveredField2 = `Estás escribiendo en: ${field}`; }
  onMouseOver2(field: string) { this.hoveredField2 = `Mouse sobre: ${field}`; }
  onMouseLeave2() { this.hoveredField2 = ''; }

  onFocus3(field: string) { this.hoveredField3 = `Estás escribiendo en: ${field}`; }
  onMouseOver3(field: string) { this.hoveredField3 = `Mouse sobre: ${field}`; }
  onMouseLeave3() { this.hoveredField3 = ''; }

}
