import { TestBed, inject } from '@angular/core/testing';

import { UnConseilService } from './un-conseil.service';

describe('UnConseilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnConseilService]
    });
  });

  it('should ...', inject([UnConseilService], (service: UnConseilService) => {
    expect(service).toBeTruthy();
  }));
});
