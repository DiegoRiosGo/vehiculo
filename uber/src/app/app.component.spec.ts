import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // Puedes agregar más propiedades o métodos según sea necesario para tu prueba
            snapshot: {
              paramMap: {
                get: () => 'some_value',
              },
            },
          },
        },
        DbserviciosService, // Agrega tu servicio aquí
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // Agrega más pruebas según sea necesario
});