/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HypPageComponent } from './hyp-page.component';

describe('HypPageComponent', () => {
  let component: HypPageComponent;
  let fixture: ComponentFixture<HypPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HypPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
