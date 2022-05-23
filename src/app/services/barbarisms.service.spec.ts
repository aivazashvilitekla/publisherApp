/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BarbarismsService } from './barbarisms.service';

describe('Service: Barbarisms', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BarbarismsService]
    });
  });

  it('should ...', inject([BarbarismsService], (service: BarbarismsService) => {
    expect(service).toBeTruthy();
  }));
});
