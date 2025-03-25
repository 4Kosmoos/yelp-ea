import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authRestaurateurGuard } from './auth-restaurateur.guard';

describe('authRestaurateurGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authRestaurateurGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
