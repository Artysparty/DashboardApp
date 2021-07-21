import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';

import { RouterTestingModule } from '@angular/router/testing';

import { LoginResponseDTO } from '../../models/user.dto';

import { InnerLayoutComponent } from './inner-layout.component';

describe('InnerLayoutComponent', () => {
  let component: InnerLayoutComponent;
  let fixture: ComponentFixture<InnerLayoutComponent>;
  let routerMock = { navigate: jest.fn() };
  const user: LoginResponseDTO = {
    id: 1,
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@test.ru',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InnerLayoutComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: Router, useValue: routerMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should withdraw firstname and lastname', () => {
    component.user = user;
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('small').textContent
    ).toContain(`${component.user.firstName} ${component.user.lastName}`);
  });

  it(
    'should exit button clear session storage',
    waitForAsync(() => {
      sessionStorage.setItem('user', JSON.stringify(user));
      component.user = user;
      fixture.detectChanges();
      const spy = jest.spyOn(component, 'exit');
      const button = fixture.debugElement.nativeElement.querySelector(
        '[data-qa-id="exitBtn"]'
      );
      button.click();
      fixture.whenStable().then(() => {
        expect(spy).toBeCalled();
        expect(sessionStorage.getItem('user')).toBeFalsy();
        expect(routerMock.navigate).toHaveBeenCalledWith(['/auth/login']);
      });
    })
  );
});
