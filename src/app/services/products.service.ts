import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  production: false;
  baseUrl = environment.url;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Auth-key": "ordmangRestApi"
    });
    let options = { headers: headers };

    return this.http.get(this.baseUrl + "products/cementProductsList", options);
  }
}
