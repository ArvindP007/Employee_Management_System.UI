import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Make sure 'styleUrls' is correct
})
export class HomeComponent {
  constructor(private jwtHelper: JwtHelperService, @Inject(PLATFORM_ID) private platformId: Object) {}

  isUserAuthenticated = (): boolean => {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem("jwt");
      if (token && !this.jwtHelper.isTokenExpired(token)) {
        return true;
      }
    }
    return false;
  }

  logOut = () => {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("jwt");
    }
  }
}
