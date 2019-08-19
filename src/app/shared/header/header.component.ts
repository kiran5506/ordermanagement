import { UserService } from "./../../services/user.service";
import { DatabroadcastService } from "./../../services/databroadcast.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  isShowhide: boolean = false;

  cartList: any;
  cartLegth: number = 0;

  constructor(
    private authService: AuthenticationService,
    private broadcastService: DatabroadcastService,
    private cartService: UserService
  ) {}

  public cart() {
    this.broadcastService.sharedCartLength.subscribe(data => {
      console.log("data", data);
      this.cartLegth = data;
    });

    console.log("cartLength", this.cartLegth);
  }

  ngOnInit() {
    this.cart();

    // let login = localStorage.getItem("isOMlogin");
    // if (login == "true") {
    //   this.isShowhide = true;
    // } else {
    //   this.isShowhide = false;
    // }
  }

  logout() {
    this.authService.logOut();
  }

  ngAfterViewInit() {
    this.broadcastService.isShowhide.subscribe((data: any) => {
      if (data == true) {
        this.isShowhide = true;
      } else {
        this.isShowhide = false;
      }
    });
  }
}
