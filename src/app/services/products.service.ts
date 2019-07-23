import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  baseUrl = environment.Url;

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
