import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevacontraenaPage } from './nuevacontraena.page';

describe('NuevacontraenaPage', () => {
  let component: NuevacontraenaPage;
  let fixture: ComponentFixture<NuevacontraenaPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(NuevacontraenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
