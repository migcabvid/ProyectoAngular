import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FormularioComponent } from './formulario/formulario.component';

export const routes: Routes = [
  { path: '', component: HeaderComponent },
  { path: 'formulario', component: FormularioComponent },
];
