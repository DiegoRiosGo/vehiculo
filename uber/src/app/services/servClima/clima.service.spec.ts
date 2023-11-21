import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClimaService } from './clima.service';

describe('ClimaService', () => {
  let service: ClimaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa el módulo de pruebas de HttpClient
      providers: [ClimaService]
    });
    service = TestBed.inject(ClimaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Agrega más pruebas según sea necesario
});