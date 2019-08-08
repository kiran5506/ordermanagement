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

  userProfileupdate(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "users/update", data, options);
  }

  getUserProfile(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "users/getuserdetails", data, options);
  }

  addToCart(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "products/addtoCart", data, options);
  }

  userCartList(data: any): Observable<any> {
    return this.http.post(
      this.baseUrl + "products/getCartItemsByUserid",
      data,
      options
    );
  }

  userCartDelete(data: any): Observable<any> {
    return this.http.post(
      this.baseUrl + "products/deleteCartItem",
      data,
      options
    );
  }

  userCreateAddress(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "users/addAddress", data, options);
  }

  userGetAddress(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "users/getUserAddress", data, options);
  }
}
