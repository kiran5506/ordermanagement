import { ToastrService } from "ngx-toastr";
import { DatabroadcastService } from "../../services/databroadcast.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @Output()userNameEmit = new EventEmitter<string>();
  loginForm: FormGroup;
 
  constructor(
    private loginService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private databroadcastService: DatabroadcastService,
    private toastrService: ToastrService
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
    let formData = {
      email: this.loginForm.value.userName,
      password: this.loginForm.value.password
    };
    console.log("formData", formData);
    this.loginService.login(formData).subscribe((response: any) => {
      console.log("loginResponse", response);
      if (response.status === 200) {
        this.databroadcastService.isShowhide.emit(true);
        this.userNameEmit.emit('sanjeevreddy')
       // this.databroadcastService.userName.emit(response.userdata.owner_name);
        console.log("ownerName", response.userdata.owner_name);
        // this.databroadcastService.user(response.userdata.owner_name);
        localStorage.setItem("user", JSON.stringify(response.userdata));
        this.toastrService.success("login successfully");
        this.router.navigateByUrl("/home");
      } else if (response.status === 404) {
        this.toastrService.error("invalid credentials", "loginFailed");
      }
    });
  }
}
