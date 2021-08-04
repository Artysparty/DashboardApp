import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  private returnUrl: string | null = null;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl;
  }

  exit(): void {
    if (this.returnUrl) {
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.location.back();
    }
  }
}
