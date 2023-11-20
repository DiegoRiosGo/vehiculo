import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminvehiculoPage } from './adminvehiculo.page';

describe('AdminvehiculoPage', () => {
  let component: AdminvehiculoPage;
  let fixture: ComponentFixture<AdminvehiculoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminvehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
