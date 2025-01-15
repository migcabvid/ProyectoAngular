import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angularProyect';

  mostrarMenu: boolean = false;
  fMostrarMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  colorEstado = {
    "color": "red",
    "background-color": "blue"
  };
}