import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root', // Componente raíz de la aplicación.
  standalone: true, // Componente independiente.
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html', // Define la vista del componente.
  styleUrls: ['./app.component.css'],  // Estilos del componente.
})
export class AppComponent {
  title = 'angularProyect';
}
