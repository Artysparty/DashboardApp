import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginResponseDTO } from '../../models/user.dto';

import { InnerLayoutComponent } from './inner-layout.component';

describe('InnerLayoutComponent', () => {
  let component: InnerLayoutComponent;
  let fixture: ComponentFixture<InnerLayoutComponent>;
  const user: LoginResponseDTO = {
    id: 1,
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@test.ru',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerLayoutComponent ],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
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
    expect(fixture.debugElement.nativeElement.querySelector('small').textContent).toContain(`${component.user.firstName} ${component.user.lastName}`)
  })

  it('should exit button clear session storage', () => {
    sessionStorage.setItem('user', JSON.stringify(user));

    let buttonElement = fixture.debugElement.nativeElement.querySelector('button');
    buttonElement.triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      expect(sessionStorage.getItem('user')).toBeFalsy();
    });
  })
});