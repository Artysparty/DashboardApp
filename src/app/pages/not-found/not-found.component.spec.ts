import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';

import { AppMaterialModule } from 'src/app/shared/app-material.module';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  const routerMock = { navigateByUrl: jest.fn() };
  const locationMock = { back: jest.fn() };
  const fakeActivatedRoute: RouteInterface = {
    snapshot: {
      queryParams: {
        returnUrl: 'some',
      },
    },
  };

  interface RouteInterface {
    snapshot: {
      queryParams: {
        returnUrl: string | null;
      }
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
      providers: [
        { provide: Location, useValue: locationMock },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: Router, useValue: routerMock },
      ],
      imports: [AppMaterialModule],
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

  it(
    'should work with navigateByUrl when url exists',
    waitForAsync(() => {
      const exitSpy = jest.spyOn(component, 'exit');
      const navigateSpy = jest.spyOn(routerMock, 'navigateByUrl');
      const button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
      fixture.whenStable().then(() => {
        expect(exitSpy).toHaveBeenCalled();
        expect(navigateSpy).toHaveBeenCalled();
      });
    }),
  );

  it(
    'should work with navigateByUrl when no url',
    waitForAsync(() => {
      const exitSpy = jest.spyOn(component, 'exit');
      const locationSpy = jest.spyOn(locationMock, 'back');
      const button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
      fixture.whenStable().then(() => {
        expect(exitSpy).toHaveBeenCalled();
        expect(locationSpy).toHaveBeenCalled();
      });
    }),
  );
});
