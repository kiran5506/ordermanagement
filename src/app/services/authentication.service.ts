import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  baseUrl = environment.Url;

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  constructor(private http: HttpClient) {}
  login(data: any): Observable<any> {
    console.log("userData", data);
    // let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append("Auth-key", "ordmangRestApi");
    // headers = headers.append("Content-Type", "application/json"
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Auth-key": "ordmangRestApi"
    });
    let options = { headers: headers };
    return this.http.post(this.baseUrl + "admin/login", data, options);
  }
}
