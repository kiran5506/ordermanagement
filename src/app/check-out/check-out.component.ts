import { DatabroadcastService } from "./../services/databroadcast.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { ProductsService } from "./../services/products.service";
import { UserService } from "./../services/user.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-check-out",
  templateUrl: "./check-out.component.html",
  styleUrls: ["./check-out.component.scss"]
})
export class CheckOutComponent implements OnInit {
  userId: any;
  cartIds: any;
  grandTotal: any;
  user: any;
  addressList: any;
  addressTypes: any;
  addressForm: FormGroup;
  showhideAddressForm: boolean = false;
  address_id: any;
  refNumber = "";
  refName: string = "";
  refNumberMessage: string = "";
  refNameMessage: string = "";
  constructor(
    private userService: UserService,
    private productService: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private databroadcastService: DatabroadcastService
  ) {
    this.loadingAddressForm(fb);
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));

    console.log("userDetails ---> ", this.user.user_id);

    this.databroadcastService.shareGrandTotal.subscribe(
      data => (this.grandTotal = data)
    );
    console.log(this.grandTotal);

    this.cartItems();
    this.getUserAddress();
    this.getUserAddressTypes();
    this.loadCheckOutPage();
  }

  public loadCheckOutPage() {
    if (this.user != null) {
      this.databroadcastService.isShowhide.emit(true);
    } else {
      this.databroadcastService.isShowhide.emit(false);
    }
  }

  userReferences() {
    let referenceObj = {
      user_id: this.user.user_id,
      mobile_number: this.refNumber,
      referece_name: this.refName,
      amount: this.grandTotal
    };

    console.log("referenceObj", referenceObj);
    this.userService.userReference(referenceObj).subscribe(resp => {
      console.log("reference obj", resp);
    });
  }

  referenceNumber(number) {
    // this.refNumber = null;
    this.refNumber = number;
    if (this.refNumber != "") {
      this.refNameMessage = "Name can't be empty";
    } else {
      this.refNameMessage = "";
    }
    console.log("refernrenumber", this.refNumber);
  }
  referenceName(name) {
    this.refName = name;
    if (this.refName != "") {
      this.refNumberMessage = "Number can't be empty";
    } else {
      this.refNumberMessage = "";
    }
    console.log("referenceName", this.refName);
  }

  public loadingAddressForm(fb) {
    this.addressForm = fb.group({
      address_type: [null, Validators.required],
      userAddress: [null, Validators.required]
    });
  }

  addNewDeliveryAddress() {
    this.showhideAddressForm = true;
    this.addressForm.patchValue({
      address_type_id: null,
      userAddress: null
    });
  }

  createNewAddress() {
    let addressObj = {
      user_id: this.user.user_id,
      address_type_id: this.addressForm.value.address_type,
      address: this.addressForm.value.userAddress
    };
    console.log("addressObj", addressObj);
    this.userService.userCreateAddress(addressObj).subscribe(response => {
      console.log("createAddress", response);
      if (response.status == 200) {
        this.showhideAddressForm = false;
        this.getUserAddress();
      }
    });
  }

  getUserAddressTypes() {
    this.userService.getUserAddressTypes().subscribe(resp => {
      console.log("typesResponse", resp.result);

      this.addressTypes = resp.result;
    });
  }

  getUserAddress() {
    let addressObj = {
      user_id: this.user.user_id
    };
    this.userService.userGetAddress(addressObj).subscribe(resp => {
      this.addressList = resp.result;
      console.log("addressList", this.addressList);
    });
  }

  cartItems() {
    let userIdObj = {
      user_id: this.user.user_id
    };
    console.log("userIdObj", userIdObj);
    this.userService.userCartList(userIdObj).subscribe(resp => {
      const userCartList = resp.result;
      console.log("userCartList", userCartList);
      this.cartIds = userCartList.map(({ cart_id }) => cart_id);
    });
  }

  selectAddress(addressId) {
    this.address_id = addressId;
    console.log("addressId", addressId);
  }

  confirmOrder() {
    // if (this.refName != "" && this.refNumber != "") {
    //   this.refNumberMessage = "";
    //   this.refNameMessage = "";
    // } else {
    //   if (this.refNumber != "") {
    //     if (this.refName == "") {
    //       this.refNameMessage = "Name can't be empty";
    //     }
    //   } else {
    //     this.refNameMessage = "";
    //     if (this.refName != "") {
    //       this.refNumberMessage = "Number can't be empty";
    //     } else {
    //       this.refNumberMessage = "";
    //     }
    //   }
    // }
    if (this.address_id == undefined) {
      this.toastrService.error("please  selecet a address");
    } else {
      let orderObj = {
        user_id: this.user.user_id,
        address_id: 1,
        total_amout: this.grandTotal,
        paymeny_type_id: 1,
        cart_items: this.cartIds
      };
      console.log("orderObj", orderObj);

      this.productService.userConfirmOrder(orderObj).subscribe(resp => {
        console.log("confirmOrder", resp.result);
        if (resp.status == 200) {
          this.userReferences();
          this.databroadcastService.orderId(resp.result);
          this.router.navigateByUrl("thankYou");
        }
      });
    }
  }
}
