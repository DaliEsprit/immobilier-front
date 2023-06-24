import { TestBed } from '@angular/core/testing';

import { ImmobiliereService } from './immobiliere.service';

describe('ImmobiliereService', () => {
  let service: ImmobiliereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImmobiliereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
