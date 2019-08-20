import { DatabroadcastService } from "./../../services/databroadcast.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { Console } from "@angular/core/src/console";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  addressForm: FormGroup;
  currentUser: any;
  addressList: any;
  addressTypeId: any;
  showhideuseraddressForm: boolean = false;
  addressFormCancel: boolean = false;
  addressTypes: any;
  addUpdateFormvalue: number;
  updateAddressId: number;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private databroadcastService: DatabroadcastService
  ) {
    this.loadingProfileForm(fb);
    this.loadingAddressForm(fb);
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    console.log("currentUser", this.currentUser);

    this.userAddress();
    this.getUserAddresstypes();
    this.databroadcastService.isShowhide.emit(true);
  }

  public loadingProfileForm(fb) {
    this.profileForm = fb.group({
      shop_name: ["", Validators.required],
      owner_name: ["", Validators.required],
      gst_number: ["", Validators.required],
      mobile_number: ["", Validators.required],
      email: ["", Validators.required],
      address: ["", Validators.required],
      pincode: ["", Validators.required]
    });

    this.getUserProfile();
  }

  public getUserProfile() {
    let currentUser = JSON.parse(localStorage.getItem("user"));
    let user_id = {
      user_id: currentUser.user_id
    };
    this.userService.getUserProfile(user_id).subscribe(resp => {
      console.log("userProfile", resp);
      this.profileForm.patchValue({
        shop_name: resp.result.shop_name,
        owner_name: resp.result.owner_name,
        mobile_number: resp.result.mobile_number,
        email: resp.result.email,
        gst_number: resp.result.gst_number,
        address: resp.result.address,
        pincode: resp.result.pincode
      });
    });
  }

  update() {
    let updateForm = {
      user_id: this.currentUser.user_id,
      shop_name: this.profileForm.value.shop_name,
      owner_name: this.profileForm.value.owner_name,
      mobile_number: this.profileForm.value.mobile_number,
      email: this.profileForm.value.email,
      gst_number: this.profileForm.value.gst_number,
      address: this.profileForm.value.address,
      pincode: this.profileForm.value.pincode,
      total_amount: "0"
    };

    this.userService.userProfileupdate(updateForm).subscribe(resp => {
      console.log("updaterResp", resp);
    });
  }

  /*                                 user Address Services Integration                                           */

  public loadingAddressForm(fb) {
    this.addressForm = fb.group({
      userType: [null, Validators.required],
      userAddress: [null, Validators.required]
    });
  }

  addNewDeliveryAddress() {
    this.showhideuseraddressForm = true;
    this.addressFormCancel = false;
    this.addUpdateFormvalue = 1;
    this.addressForm.patchValue({
      userType: null,
      userAddress: null
    });
  }

  updateDeliveryAddress(updateAddress) {
    console.log("hiii===", updateAddress);
    this.updateAddressId = updateAddress.address_id;
    this.showhideuseraddressForm = true;
    console.log("status==", this.showhideuseraddressForm);
    this.addressFormCancel = true;
    this.addUpdateFormvalue = 2;

    this.addressForm.patchValue({
      userType: updateAddress.address_type_id,
      userAddress: updateAddress.address
    });

    console.log("hello===", this.addressForm.value);
  }

  address(address) {
    if (address == 1) {
      /* add New Delivery Address  */

      let addressObj = {
        user_id: this.currentUser.user_id,
        address_type_id: this.addressForm.value.userType,
        address: this.addressForm.value.userAddress
      };
      console.log("addressObj", addressObj);
      this.userService.userCreateAddress(addressObj).subscribe(resp => {
        console.log("addressObjresponse", resp);
        if (resp.status == 200) {
          this.userAddress();
          this.showhideuseraddressForm = false;
        }
      });
    } else {
      /* Update Delivery Address */

      let updateObj = {
        address_id: this.updateAddressId,
        address_type_id: this.addressForm.value.userType,
        address: this.addressForm.value.userAddress
      };
      console.log("updateObj", updateObj);
      this.userService.userUpdateAddress(updateObj).subscribe(resp => {
        console.log("addressUpdate", resp);
        if (resp.status == 200) {
          this.userAddress();
          this.showhideuseraddressForm = false;
        }
      });
    }
  }

  formCancel() {
    this.showhideuseraddressForm = false;
  }

  deleteDeliveryAddress(id) {
    if (this.showhideuseraddressForm == false) {
      let deleteObj = {
        address_id: id
      };

      console.log("deleteObj", deleteObj);

      this.userService.userDeleteAddress(deleteObj).subscribe(resp => {
        console.log("deleteresponse", resp);
        this.userAddress();
      });
    }
  }

  getUserAddresstypes() {
    this.userService.getUserAddressTypes().subscribe(resp => {
      console.log("addressTypes", resp);

      this.addressTypes = resp.result;
    });
  }

  userAddress() {
    let getAddreesObj = {
      user_id: this.currentUser.user_id
    };
    this.userService.userGetAddress(getAddreesObj).subscribe(resp => {
      console.log("getAddreesObj", resp);

      this.addressList = resp.result;
    });
  }
}
