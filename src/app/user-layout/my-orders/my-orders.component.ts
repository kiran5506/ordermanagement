import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { DatabroadcastService } from "src/app/services/databroadcast.service";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.scss"]
})
export class MyOrdersComponent implements OnInit {
  ordersList: any;
  orderID: any;
  user: any;
  isHidden: boolean = true;
  constructor(
    private userService: UserService,
    private databroadcastService: DatabroadcastService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log("user", this.user);
    this.orders();

    this.databroadcastService.isShowhide.emit(true);
  }

  orders() {
    let ordersObj = {
      user_id: this.user.user_id,
      type_id: 1
    };

    console.log("ordersObj", ordersObj);
    this.userService.getUserOrders(ordersObj).subscribe(resp => {
      console.log("ordersResponse--->", resp.result);

      this.ordersList = resp.result;
      console.log("ordersList", this.ordersList);
    });
  }

  orderChange(orderId, type) {
    let ordersObj = {
      order_id: orderId,
      type_id: type
    };
    console.log("ordersObj", ordersObj);
    this.userService.getUserOrders(ordersObj).subscribe(resp => {
      console.log("orderIDResponse--->", resp.result);

      this.orderID = resp.result;
      console.log("orderId", this.orderID);
    });
  }
}
