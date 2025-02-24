import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  // Configuración inicial de la prueba antes de cada test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Se importa el componente para poder testearlo
      imports: [HeaderComponent]
    })
    .compileComponents();

    // Se crea una instancia del componente y su fixture de prueba
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    // Se detectan cambios para inicializar el componente
    fixture.detectChanges();
  });

  // Prueba que comprueba que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
