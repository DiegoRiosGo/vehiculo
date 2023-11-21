import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';

describe('DbserviciosService', () => {
  let service: DbserviciosService;
  let sqlite: SQLite; // Declara la variable SQLite

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [DbserviciosService, SQLite], // Incluye SQLite en la lista de proveedores
    });
    service = TestBed.inject(DbserviciosService);
    sqlite = TestBed.inject(SQLite); // Inyecta SQLite
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Agrega más pruebas según sea necesario
});