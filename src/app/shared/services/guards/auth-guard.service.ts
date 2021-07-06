import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SessionStorageService } from "../session-storage.service";
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private storageService: SessionStorageService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.storageService.getUser()){
            return true;
        } else {
            this.router.navigateByUrl('/auth/login');
            return false;
        }
    }

}