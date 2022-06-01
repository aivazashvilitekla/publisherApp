/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MorphologyService } from './morphology.service';

describe('Service: Morphology', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MorphologyService]
    });
  });

  it('should ...', inject([MorphologyService], (service: MorphologyService) => {
    expect(service).toBeTruthy();
  }));
});
