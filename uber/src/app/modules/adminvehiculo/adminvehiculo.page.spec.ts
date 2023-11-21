import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminvehiculoPage } from './adminvehiculo.page';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { IonicModule } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AdminvehiculoPage', () => {
  let component: AdminvehiculoPage;
  let fixture: ComponentFixture<AdminvehiculoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminvehiculoPage],
      imports: [IonicModule.forRoot()],
      providers: [
        DbserviciosService,
        SQLite,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminvehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Agrega más pruebas según sea necesario
});