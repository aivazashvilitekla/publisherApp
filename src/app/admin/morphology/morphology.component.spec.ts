/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MorphologyComponent } from './morphology.component';

describe('MorphologyComponent', () => {
  let component: MorphologyComponent;
  let fixture: ComponentFixture<MorphologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorphologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorphologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
