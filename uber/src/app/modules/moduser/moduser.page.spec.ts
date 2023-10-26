import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModuserPage } from './moduser.page';

describe('ModuserPage', () => {
  let component: ModuserPage;
  let fixture: ComponentFixture<ModuserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
