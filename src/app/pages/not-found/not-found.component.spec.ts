import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';

import { NotFoundComponent } from './not-found.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let routerMock = { navigateByUrl: jest.fn() };
  let fakeActivatedRoute = {
    snapshot: {
      queryParams: {
        returnUrl: '123/123',
      },
    },
  };
  let locationMock = { back: jest.fn() };

  let returnUrl: string | null =
    fakeActivatedRoute.snapshot.queryParams.returnUrl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
      providers: [
        { provide: Location, useValue: locationMock },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: Router, useValue: routerMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run exit method', () => {
    const spy = jest.spyOn(component, 'exit');
    component.exit();
    expect(spy).toBeCalled();
  });

  // it('should redirect correctly when url', () => {
  //   const spy = jest.spyOn(component, 'exit');
  //   component.exit();
  //   expect(spy).toHaveBeenCalledWith(routerMock.navigateByUrl(returnUrl));
  // });

  // it('should redirect correctly when no url', () => {
  //   returnUrl = null;
  //   const spy = jest.spyOn(component, 'exit');
  //   component.exit();
  //   expect(spy).toHaveBeenCalledWith(locationMock.back());
  // });

  it('should', waitForAsync(() => {
      const spy = jest.spyOn(component, 'exit');
      let button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
      fixture.whenStable().then(() => {
        expect(spy).toHaveBeenCalled();
      });
    })
  );
});
