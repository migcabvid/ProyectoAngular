import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true, // <-- Indicar que es un componente standalone
  imports: [CommonModule, ReactiveFormsModule], // <-- Importar ReactiveFormsModule
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  formulario: FormGroup;
  hoveredField: string = '';

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  get nombre() { return this.formulario.get('nombre'); }
  get email() { return this.formulario.get('email'); }
  get mensaje() { return this.formulario.get('mensaje'); }

  enviarFormulario() {
    if (this.formulario.valid) {
      alert('Formulario enviado correctamente ✅');
      console.log(this.formulario.value);
    } else {
      alert('❌ Corrige los errores antes de enviar.');
    }
  }

  onFocus(field: string) { this.hoveredField = `Estás escribiendo en: ${field}`; }
  onMouseOver(field: string) { this.hoveredField = `Mouse sobre: ${field}`; }
  onMouseLeave() { this.hoveredField = ''; }
}
