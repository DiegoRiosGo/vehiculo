import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModuserPage } from './moduser.page';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { CamaraService } from 'src/app/services/servCamara/camara.service';
import { AlertController, IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ModuserPage', () => {
  let component: ModuserPage;
  let fixture: ComponentFixture<ModuserPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuserPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: {
              subscribe(callback: (paramMap: any) => void) {
                callback(convertToParamMap({ usuarioid: 123 })); // Puedes ajustar el valor según tus necesidades
              }
            }
          }
        },
        DbserviciosService,
        CamaraService,
        AlertController,
        SQLite, // Asegúrate de agregar el proveedor para SQLite
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Agrega más pruebas según sea necesario
});