import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
let headers = new HttpHeaders({
  "Content-Type": "application/json",
  "Auth-key": "ordmangRestApi"
});
let options = { headers: headers };

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  production: false;
  baseUrl = environment.url;

  constructor(private http: HttpClient) {}

  getCementProducts(): Observable<any> {
    return this.http.get(this.baseUrl + "products/cementProductsList", options);
  }
  getBarsProducts(): Observable<any> {
    return this.http.get(this.baseUrl + "products/barsList", options);
  }

  userConfirmOrder(data: any): Observable<any> {
    return this.http.post(
      this.baseUrl + "products/confirmOrder",
      data,
      options
    );
  }
}
