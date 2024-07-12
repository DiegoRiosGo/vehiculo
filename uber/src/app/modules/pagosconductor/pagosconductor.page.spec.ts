import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagosconductorPage } from './pagosconductor.page';

describe('PagosconductorPage', () => {
  let component: PagosconductorPage;
  let fixture: ComponentFixture<PagosconductorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PagosconductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
