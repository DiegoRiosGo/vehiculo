import { TestBed } from '@angular/core/testing';

import { ValcontraseñaService } from './valcontraseña.service';

describe('ValcontraseñaService', () => {
  let service: ValcontraseñaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValcontraseñaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
