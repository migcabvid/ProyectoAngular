import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-directivas',
  imports: [CommonModule, FormsModule],
  templateUrl: './directivas.component.html',
  styleUrl: './directivas.component.css'
})
export class DirectivasComponent {

  // Variables para el ejemplo de ngIf
  mostrarTexto: boolean = true;

  // Variables para el ejemplo de ngSwitch
  color: string = 'azul';

  // Variables para el ejemplo de ngStyle
  colorEstado = {
    "color": "red",
    "text-align": "center",
    "text-decoration": "underline",
    "text-decoration-color": "blue"
  };

  formatoTexto = {
    "font-size": "20px",
    "font-style": "italic"
  };

  // Lista para la directiva ngFor
  lista: string[] = ['Elemento 1', 'Elemento 2', 'Elemento 3', 'Elemento 4'];

  //Variable ngClass
  activo = false;

  //Variable ngModel
  textoInput: string = 'Esto esta puesto en la variable, editalo  ';

  alternarActivo() {
    this.activo = !this.activo;
    console.log('Estado de isActive:', this.activo);
  }
}
