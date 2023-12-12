import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialconductorPage } from './historialconductor.page';

describe('HistorialconductorPage', () => {
  let component: HistorialconductorPage;
  let fixture: ComponentFixture<HistorialconductorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HistorialconductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
