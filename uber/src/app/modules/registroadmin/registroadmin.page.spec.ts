import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroadminPage } from './registroadmin.page';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';

describe('RegistroadminPage', () => {
  let component: RegistroadminPage;
  let fixture: ComponentFixture<RegistroadminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroadminPage],
      imports: [IonicModule.forRoot()],
      providers: [
        DbserviciosService,
        SQLite, // Asegúrate de agregar el proveedor para SQLite
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Agrega más pruebas según sea necesario
});