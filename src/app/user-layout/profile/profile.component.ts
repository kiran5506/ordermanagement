import { FormBuilder } from "@angular/forms";
import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit() {}
}
