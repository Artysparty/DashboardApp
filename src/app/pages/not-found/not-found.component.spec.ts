import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';

import { NotFoundComponent } from './not-found.component';
import { AppMaterialModule } from 'src/app/shared/app-material.module';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let routerMock = { navigateByUrl: jest.fn() };
  let locationMock = { back: jest.fn() };
  let fakeActivatedRoute: RouteInterface = {
    snapshot: {
      queryParams: {
        returnUrl: "some",
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
      declarations: [ NotFoundComponent ],
      providers: [
        { provide: Location, useValue: locationMock },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: Router, useValue: routerMock },
      ],
      imports: [ AppMaterialModule ]
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
    })
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
    })
  );
});
