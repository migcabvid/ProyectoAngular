import { Component } from '@angular/core';
import { DirectivasComponent } from "../directivas/directivas.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormularioComponent } from '../formulario/formulario.component';


@Component({
  selector: 'app-header',
  imports: [DirectivasComponent, CommonModule, FormsModule, FormularioComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  vistaActual: string = ' ';
  mostrarContenido(txtBtn: string): void {
    this.vistaActual = txtBtn;
    console.log(txtBtn);
  }
}