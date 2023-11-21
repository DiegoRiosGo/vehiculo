import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfiluserPage } from './perfiluser.page';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClimaService } from 'src/app/services/servClima/clima.service';

describe('PerfiluserPage', () => {
  let component: PerfiluserPage;
  let fixture: ComponentFixture<PerfiluserPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfiluserPage],
      providers: [ClimaService], // Asegúrate de proporcionar ClimaService
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfiluserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Agrega más pruebas según sea necesario
});