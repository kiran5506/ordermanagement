import { DatabroadcastService } from "./databroadcast.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
let headers = new HttpHeaders({
  "Content-Type": "application/json",
  "Auth-key": "ordmangRestApi"
});
var options = { headers: headers };

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  baseUrl = environment.url;

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    private broadCastService: DatabroadcastService
  ) {}

  signUp(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "users/create", data, options);
  }

  login(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "users/login", data, options);
  }

  loggedIn() {
    return !!localStorage.getItem("user");
  }

  logOut() {
    this.broadCastService.isShowhide.emit(false);
    localStorage.removeItem("isOMlogin");
    localStorage.removeItem("user");
    localStorage.removeItem("addToCart");
    localStorage.removeItem("cartList");
    this.router.navigateByUrl("login");
  }
}
