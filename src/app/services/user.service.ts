import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

let headers = new HttpHeaders({
  "Content-Type": "application/json",
  "Auth-key": "ordmangRestApi"
});
var options = { headers: headers };

@Injectable({
  providedIn: "root"
})
export class UserService {
  baseUrl = environment.url;

  constructor(private http: HttpClient) {}

  update(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "users/update", data, options);
  }

  getUserProfile(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "users/getuserdetails", data, options);
  }
}
