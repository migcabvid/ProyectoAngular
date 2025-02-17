import { Routes } from '@angular/router';
import { DirectivasComponent } from './directivas/directivas.component';
import { FormularioComponent } from './formulario/formulario.component';
import { DatosComponent } from './datos/datos.component';

export const appRoutes: Routes = [
  // Carga DirectivasComponent al navegar a '/directivas'
  { path: 'directivas', component: DirectivasComponent },
  // Carga FormularioComponent al navegar a '/formulario'
  { path: 'formulario', component: FormularioComponent },
  // Carga DatosComponent al navegar a '/datos'
  { path: 'datos', component: DatosComponent },
  // Si la ruta está vacía, redirige a '/directivas'
  { path: '', redirectTo: 'directivas', pathMatch: 'full' },
  // Redirige cualquier ruta desconocida a '/directivas'
  { path: '**', redirectTo: 'directivas' }
];
