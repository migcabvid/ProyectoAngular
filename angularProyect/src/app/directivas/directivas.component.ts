import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-directivas',
  imports: [CommonModule],
  templateUrl: './directivas.component.html',
  styleUrl: './directivas.component.css'
})
export class DirectivasComponent {

   // Variables para el ejemplo de ngIf
   mostrarTexto: boolean = true;

   // Variables para el ejemplo de nfStyle
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
 
   // Variables para el ejemplo de ngSwitch
   color: string = 'azul';
}
