import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AskEmailPage } from './ask-email.page';

describe('AskEmailPage', () => {
  let component: AskEmailPage;
  let fixture: ComponentFixture<AskEmailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AskEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
