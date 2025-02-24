import { Component } from '@angular/core';

@Component({
  selector: 'app-footer', // Selector para incluir este componente en otras plantillas.
  imports: [], // No se importan módulos adicionales en este componente.
  templateUrl: './footer.component.html', // Ruta al archivo HTML que define la vista.
  styleUrl: './footer.component.css' // Ruta al archivo CSS para estilos (nota: normalmente se usa "styleUrls" en plural).
})
export class FooterComponent {
  // Componente Footer sin lógica adicional.
}
