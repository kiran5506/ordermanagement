import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(["login"]);
      return false;
    }
  }
}
