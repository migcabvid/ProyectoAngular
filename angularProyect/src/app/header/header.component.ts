import { Component } from '@angular/core';
import { DirectivasComponent } from "../directivas/directivas.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-header',
  imports: [DirectivasComponent, CommonModule, FormsModule],
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