import { AuthenticationService } from "src/app/services/authentication.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  ngOnInit() {}

  logout() {
    this.authService.logOut();
  }
}
