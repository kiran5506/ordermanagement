import { DatabroadcastService } from "../../services/databroadcast.service";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private loginService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private databroadcastService: DatabroadcastService
  ) {
    this.loadingLoginForm(fb);
  }

  ngOnInit() {}

  public loadingLoginForm(fb) {
    this.loginForm = fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    console.log("login");
    let formData = {
      email: this.loginForm.value.userName,
      password: this.loginForm.value.password
    };

    // this.databroadcastService.isShowhide.emit(true);
    console.log("formData", formData);
    this.loginService.login(formData).subscribe((response: any) => {
      localStorage.setItem("user", JSON.stringify(response.userdata));

      console.log("loginResponse", response);
      if (response.status === 200) {
        this.databroadcastService.isShowhide.emit(true);
        this.router.navigateByUrl("/home");
      } else if (response.status === 404) {
        this.databroadcastService.isShowhide.emit(false);
        this.router.navigateByUrl("/login");
      }
    });
  }
}
