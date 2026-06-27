import { TestBed } from '@angular/core/testing';

import { Minimax } from './minimax';

describe('Minimax', () => {
  let service: Minimax;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Minimax);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
