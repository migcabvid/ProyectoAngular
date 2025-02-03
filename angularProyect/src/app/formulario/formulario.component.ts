// Importaciones esenciales de Angular y modulos para formularios reactivos
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  formulario: FormGroup;         // Formulario reactivo con validaciones
  hoveredField: string = '';      // Mensaje de interaccion para el primer conjunto de campos
  hoveredField2: string = '';     // Mensaje de interaccion para el segundo conjunto de campos

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
      })
    });
  }

  // Getters para acceder a los controles del formulario desde la plantilla
  get nombre() { return this.formulario.get('nombre'); }
  get email() { return this.formulario.get('email'); }
  get mensaje() { return this.formulario.get('mensaje'); }
  get fechaNacimiento() { return this.formulario.get('fechaNacimiento'); }
  get genero() { return this.formulario.get('genero'); }
  get intereses() { return this.formulario.get('intereses'); }

  // Envía el formulario comprobando su validez
  enviarFormulario() {
    if (this.formulario.valid) {
      alert('Formulario enviado correctamente ✅');
      console.log(this.formulario.value);
    } else {
      alert('❌ Corrige los errores antes de enviar.');
    }
  }

  // Metodos para gestionar la interaccion (focus y mouse) en los campos del formulario
  onFocus(field: string) { this.hoveredField = `Estás escribiendo en: ${field}`; }
  onMouseOver(field: string) { this.hoveredField = `Mouse sobre: ${field}`; }
  onMouseLeave() { this.hoveredField = ''; }

  onFocus2(field: string) { this.hoveredField2 = `Estás escribiendo en: ${field}`; }
  onMouseOver2(field: string) { this.hoveredField2 = `Mouse sobre: ${field}`; }
  onMouseLeave2() { this.hoveredField2 = ''; }
}