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
    private router: Router
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

      console.log("loginResponse", response);
      if (response.status === 200) {
        this.router.navigateByUrl("/home");
      } else if (response.status === 404) {
        this.router.navigateByUrl("/login");
      }
    });
  }
}
