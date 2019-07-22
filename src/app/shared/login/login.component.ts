import { AuthenticationService } from "./../../services/authentication.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private loginService: AuthenticationService,
    private fb: FormBuilder
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
      emailmobile: this.loginForm.value.userName,
      password: this.loginForm.value.password
    };
    this.loginService.login(formData).subscribe((response: any) => {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(response.userdata));

      console.log("loginResponse", response.userdata);
    });
  }
}
