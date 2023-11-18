import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroadminPage } from './registroadmin.page';

describe('RegistroadminPage', () => {
  let component: RegistroadminPage;
  let fixture: ComponentFixture<RegistroadminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
