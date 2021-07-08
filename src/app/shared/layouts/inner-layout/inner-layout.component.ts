import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponseDTO } from '../../models/user.dto';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-inner-layout',
  templateUrl: './inner-layout.component.html',
  styleUrls: ['./inner-layout.component.scss'],
})
export class InnerLayoutComponent implements OnInit {
  user!: LoginResponseDTO;

  constructor(
    private storageService: SessionStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.storageService.getUser();
  }

  exit() {
    this.storageService.clear();
    this.router.navigate(['/auth/login']);
  }
}
