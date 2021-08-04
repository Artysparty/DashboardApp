import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { SessionStorageService } from '../session-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private storageService: SessionStorageService,
  ) {}

  canActivate(): boolean {
    if (this.storageService.getUser()) {
      return true;
    }
    this.router.navigateByUrl('/auth/login');
    return false;
  }
}
