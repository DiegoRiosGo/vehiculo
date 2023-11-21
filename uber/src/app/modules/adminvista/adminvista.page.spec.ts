import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AdminvistaPage } from './adminvista.page';
import { ActivatedRoute } from '@angular/router';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { of } from 'rxjs';

describe('AdminvistaPage', () => {
  let component: AdminvistaPage;
  let fixture: ComponentFixture<AdminvistaPage>;

  const mockActivatedRoute = {
    paramMap: of({ get: () => '1' }) // Mock ActivatedRoute
  };

  const mockDbserviciosService = {
    buscarUsuarioPorId: jasmine.createSpy('buscarUsuarioPorId').and.returnValue(Promise.resolve({ nombre: 'Usuario de prueba' }))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminvistaPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DbserviciosService, useValue: mockDbserviciosService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminvistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Agrega más pruebas según sea necesario
});