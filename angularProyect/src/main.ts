import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// Se inicia la aplicación Angular utilizando el componente raíz (AppComponent)
bootstrapApplication(AppComponent, {
  providers: [
    // Se configura el enrutador con las rutas definidas en appRoutes
    provideRouter(appRoutes),
    // Se configura el cliente HTTP y se registran los interceptores que se hayan definido en el contenedor de inyección de dependencias
    provideHttpClient(withInterceptorsFromDi())
  ]
});
