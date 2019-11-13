import { DatabroadcastService } from "./../../services/databroadcast.service";
import { ToastrService } from "ngx-toastr";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  isSubmited: boolean = false;
  addTypesList : any;
  addTypeID: any;
  userRoleList: any;
  userRoleId: any;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private broadCastService: DatabroadcastService,
    private toastrService: ToastrService
  ) {
    this.loadSignUpForm(fb);
  }

  ngOnInit() {
    this.authService.getAddressTypes().subscribe((response: any) => {
      this.addTypesList = response.result;
      console.log("addTypesList----" , this.addTypesList);
    });

    this.authService.getUserRole().subscribe((response: any) => {
      this.userRoleList = response.users;
      console.log("userRoleList=====" , this.userRoleList);
    });
  }

  public loadSignUpForm(fb) {
    this.signUpForm = fb.group({
      shop_name: [null, Validators.required],
      total_amount: [null],
      mobile_number: [
        null,
        [Validators.required, Validators.pattern("^[0-9]*$")]
      ],
      email: [
        "",
        // [
        //   Validators.required,
        //   Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        // ]
      ],
      password: [null, Validators.required],
      gst_number: [""],
      owner_name: [null, Validators.required],
      addType: [null, Validators.required],
      address: [null, Validators.required],
      userRoleId: [null, Validators.required],
      pincode: [null, Validators.required]
    });
  }

  selectChange1(id) {
    this.addTypeID = id;
    console.log("addtypeID---" , this.addTypeID);
  }

  selectChange2(id) {
    this.userRoleId = id;
    console.log("userRoleId----" , this.userRoleId);
  }

  onSignUp() {
    let formData = {
      shop_name: this.signUpForm.value.shop_name,
      total_amount: 0,
      mobile_number: this.signUpForm.value.mobile_number,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      gst_number: this.signUpForm.value.gst_number,
      owner_name: this.signUpForm.value.owner_name,
      address: this.signUpForm.value.address,
      address_type_id: this.addTypeID,
      user_role_id: this.userRoleId,
      pincode: this.signUpForm.value.pincode
    }

    console.log("formData", formData);

    this.authService.signUp(formData).subscribe((response: any) => {
      console.log("SignUp", response);
      if (response.status == 200) {
        localStorage.setItem("user", JSON.stringify(response.result));
        this.broadCastService.isShowhide.emit(true);
        // this.broadCastServicse.showUserName.emit(true);
        this.toastrService.success("sign up successfully");
        this.router.navigateByUrl("home");
      } else {
        this.router.navigateByUrl("signUp");
      }
    });
  }
}
