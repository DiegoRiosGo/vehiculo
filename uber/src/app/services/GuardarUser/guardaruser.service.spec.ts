import { TestBed } from '@angular/core/testing';

import { GuardarUsuarioService } from './guardaruser.service';

describe('GuardaruserService', () => {
  let service: GuardarUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardarUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
