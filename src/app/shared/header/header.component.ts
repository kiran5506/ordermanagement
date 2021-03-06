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
  showUserName: boolean = true;
  user: any;

  constructor(
    private authService: AuthenticationService,
    private broadcastService: DatabroadcastService,
    //private location: Location
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log("user", this.user);

    let login = localStorage.getItem(this.user);
    if (login != null) {
      this.isShowhide = true;
      this.showUserName = true;
    } else {
      this.isShowhide = false;
      this.showUserName = false;
    }

   // this.pageRefresh();
  }

  // pageRefresh() {
  //   location.reload();
  // }

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
