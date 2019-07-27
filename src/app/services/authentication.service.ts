import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  baseUrl = environment.url;

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  constructor(private http: HttpClient, private router: Router) {}

  login(data: any): Observable<any> {
    console.log("loginDetails", data);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Auth-key": "ordmangRestApi"
    });
    let options = { headers: headers };
    return this.http.post(this.baseUrl + "users/login", data, options);
  }

  loggedIn() {
    return !!localStorage.getItem("user");
  }

  logOut() {
    localStorage.removeItem("user");
    this.router.navigateByUrl("login");
  }
}
