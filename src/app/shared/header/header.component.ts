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

  constructor(
    private authService: AuthenticationService,
    private broadcastService: DatabroadcastService,
    private cartService: UserService
  ) {}

  ngOnInit() {
    let login = localStorage.getItem("isOMlogin");
    if (login == "true") {
      this.isShowhide = true;
    } else {
      this.isShowhide = false;
    }
  }

  logout() {
    this.authService.logOut();
  }

  ngAfterViewInit() {
    this.broadcastService.isShowhide.subscribe((data: any) => {
      console.log(data);

      if (data == true) {
        this.isShowhide = true;
      } else {
        this.isShowhide = false;
      }
    });
  }
}
