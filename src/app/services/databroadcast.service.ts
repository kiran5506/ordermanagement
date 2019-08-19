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
  private cartlength = new BehaviorSubject<number>(0);
  public sharedCartLength = this.cartlength.asObservable();

  constructor() {}
  cartLength(number) {
    this.cartlength.next(number);
  }
  orderId(any) {
    this.userOrderId.next(any);
  }
  updataGrandTotal(number) {
    this.grandTotal.next(number);
  }
  isShowhide = new EventEmitter<any>();
}
