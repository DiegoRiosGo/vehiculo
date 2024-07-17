import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminsaldosPage } from './adminsaldos.page';

describe('AdminsaldosPage', () => {
  let component: AdminsaldosPage;
  let fixture: ComponentFixture<AdminsaldosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminsaldosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
