import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialclientePage } from './historialcliente.page';

describe('HistorialclientePage', () => {
  let component: HistorialclientePage;
  let fixture: ComponentFixture<HistorialclientePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HistorialclientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
