import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModUserPage } from './mod-user.page';

describe('ModUserPage', () => {
  let component: ModUserPage;
  let fixture: ComponentFixture<ModUserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
