import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from './storage.service'; // Import the StorageService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private jwtHelper: JwtHelperService, private storageService: StorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.storageService.getItem('jwt'); // Use StorageService to get the token

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true; // Token is valid
    }

    this.router.navigate(['login']); // Redirect to login if not authenticated
    return false; // Deny access
  }
}
