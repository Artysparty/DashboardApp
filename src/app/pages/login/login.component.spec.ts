import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create hide = true', () => {
    expect(component.hide).toBeTruthy();
  });

  it('should call submit method', () => {
    const spy = jest.spyOn(component, 'submit');
    component.submit();
    expect(spy).toBeCalled();
  });

  it('should change visibility on click', () => {
    component.hide = true;
    let button =
      fixture.debugElement.nativeElement.querySelector('.hide-button');
    button.click();
    expect(component.hide).toBeFalsy();
  });

  it('should receive data from forms', () => {
    let nativeEl = fixture.nativeElement;
    let username = nativeEl.querySelector('#username');
    let password = nativeEl.querySelector('#password');

    username.value = 'someVal';
    password.value = 'otherVal';

    username.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));

    expect(component.form.controls.username.value).toBe('someVal');
    expect(component.form.controls.password.value).toBe('otherVal');
  });
});
