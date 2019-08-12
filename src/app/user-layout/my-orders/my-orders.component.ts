import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.scss"]
})
export class MyOrdersComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.orders();
  }

  orders() {
    let ordersObj = {
      user_id: 27,
      order_id: "ORDER1565262625",
      type_id: 2
    };

    this.userService.getUserOrders(ordersObj).subscribe(resp => {
      console.log("ordersResponse--->", resp.result);
    });
  }
}
