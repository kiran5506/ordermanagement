import { BehaviorSubject } from "rxjs";
import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DatabroadcastService {
  private grandTotal = new BehaviorSubject<number>(null);
  public shareGrandTotal = this.grandTotal.asObservable();
  private userOrderId = new BehaviorSubject<any>(null);
  public shareOrderId = this.userOrderId.asObservable();
  // private userName = new BehaviorSubject<any>("");
  // public sharedName = this.userName.asObservable();

  constructor() {}
  // user(any) {
  //   this.userName.next(any);
  // }
  orderId(any) {
    this.userOrderId.next(any);
  }
  updataGrandTotal(number) {
    this.grandTotal.next(number);
  }
  isShowhide = new EventEmitter<any>();
  userName = new EventEmitter<string>();
}
