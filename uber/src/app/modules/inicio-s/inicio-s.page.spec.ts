import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioSPage } from './inicio-s.page';

describe('InicioSPage', () => {
  let component: InicioSPage;
  let fixture: ComponentFixture<InicioSPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(InicioSPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
