import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleclientePage } from './detallecliente.page';

describe('DetalleclientePage', () => {
  let component: DetalleclientePage;
  let fixture: ComponentFixture<DetalleclientePage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(DetalleclientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
