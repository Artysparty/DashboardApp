import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterTestingModule } from '@angular/router/testing';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';

import { AppMaterialModule } from 'src/app/shared/app-material.module';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { OperationDTO } from 'src/app/shared/models/data.dto';

import { DashboardComponent } from './dashboard.component';

describe('LoginComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, DialogComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppMaterialModule,
      ],
      providers: [DatePipe],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [DialogComponent] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call submit method', () => {
    const spy = jest.spyOn(component, 'submit');
    component.submit();
    expect(spy).toBeCalled();
  });

  it('should call openDialog method', () => {
    const operation: OperationDTO = {
      operationDate: '11.10.1959',
      processingDate: '11.10.1959',
      amount: 123,
      authorizationCode: '123',
      balance: 123,
      category: 'Category',
      transactionDescription: 'Description',
    };

    const spy = jest.spyOn(component, 'openDialog');
    component.openDialog(operation);
    expect(spy).toBeCalled();
  });

  it('should initialize fields with given start and end dates', async () => {
    const fromDate = await loader.getHarness<MatInputHarness>(
      MatInputHarness.with({ selector: '#fromDate' })
    );
    const toDate = await loader.getHarness<MatInputHarness>(
      MatInputHarness.with({ selector: '#toDate' })
    );

    await fromDate.setValue('11.10.2000');
    await toDate.setValue('15.10.2000');

    expect(component.form.controls.fromDate.value).toBe('11.10.2000');
    expect(component.form.controls.toDate.value).toBe('15.10.2000');
  });
});
