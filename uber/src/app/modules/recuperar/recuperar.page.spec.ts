import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RecuperarPage } from './recuperar.page';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';

describe('RecuperarPage', () => {
  let component: RecuperarPage;
  let fixture: ComponentFixture<RecuperarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperarPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRoute },
        DbserviciosService,
        SQLite,  // Asegúrate de proporcionar el proveedor para SQLite
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Agrega más pruebas según sea necesario
});