import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SessionStorageService } from '../../services/session-storage.service';

import { LoginResponseDTO } from '../../models/user.dto';

@Component({
  selector: 'app-inner-layout',
  templateUrl: './inner-layout.component.html',
  styleUrls: ['./inner-layout.component.scss'],
})
export class InnerLayoutComponent {
  user: LoginResponseDTO | null = null;

  constructor(
    private storageService: SessionStorageService,
    private router: Router
  ) {
    this.user = this.storageService.getUser();
  }

  exit(): void {
    this.storageService.clear();
    this.router.navigate(['/auth/login']);
  }
}
