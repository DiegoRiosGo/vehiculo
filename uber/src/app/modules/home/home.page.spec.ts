import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [
        DbserviciosService,  // Asegúrate de agregar el servicio aquí
        SQLite, // Asegúrate de agregar el proveedor para SQLite
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Agrega más pruebas según sea necesario
});