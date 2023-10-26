import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminvistaPage } from './adminvista.page';

describe('AdminvistaPage', () => {
  let component: AdminvistaPage;
  let fixture: ComponentFixture<AdminvistaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminvistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
