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
  userDetails: any;
  addressList: any;
  addressForm: FormGroup;
  showhideAddressForm: boolean = false;
  userAddress_type: any;
  address_id: any;
  refNumber: any;
  refName: any;

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
    let user = JSON.parse(localStorage.getItem("user"));
    this.userDetails = user;
    console.log("userDetails ---> ", this.userDetails.user_id);

    this.databroadcastService.shareGrandTotal.subscribe(
      data => (this.grandTotal = data)
    );
    console.log(this.grandTotal);

    this.cartItems();
    this.getUserAddress();
  }

  userReferences() {
    let referenceObj = {
      user_id: this.userDetails.user_id,
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
    this.refNumber = number;
    console.log("refernrenumber", this.refNumber);
  }
  referenceName(name) {
    this.refName = name;
    console.log("referenceName", this.refName);
  }

  public loadingAddressForm(fb) {
    this.addressForm = fb.group({
      Address_type: [null, Validators.required],
      userAddress: [null, Validators.required]
    });
  }

  onchange(value) {
    this.userAddress_type = value;
    console.log("value", value);
  }

  addNewDeliveryAddress() {
    this.showhideAddressForm = true;
  }

  createNewAddress() {
    this.showhideAddressForm = false;
    let addressObj = {
      user_id: this.userDetails.user_id,
      address_type_id: this.userAddress_type,
      address: this.addressForm.value.userAddress
    };
    console.log("addressObj", addressObj);
    this.userService.userCreateAddress(addressObj).subscribe(response => {
      console.log("createAddress", response);
      if (response.status == 200) {
        this.getUserAddress();
      }
    });
  }

  getUserAddress() {
    let addressObj = {
      user_id: this.userDetails.user_id
    };
    this.userService.userGetAddress(addressObj).subscribe(resp => {
      this.addressList = resp.result;
      console.log("addressList", this.addressList);
    });
  }

  cartItems() {
    let userIdObj = {
      user_id: this.userDetails.user_id
    };
    console.log("userIdObj", userIdObj);
    this.userService.userCartList(userIdObj).subscribe(resp => {
      const userCartList = resp.result;
      console.log("userCartList", userCartList);
      this.cartIds = userCartList.map(({ cart_id }) => cart_id);
    });
  }

  changeAddress(addressId) {
    this.address_id = addressId;
    console.log("addressId", addressId);
  }

  confirmOrder() {
    if (this.address_id == undefined) {
      this.toastrService.error("please  selecet a address");
    } else {
      let orderObj = {
        user_id: this.userDetails.user_id,
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
