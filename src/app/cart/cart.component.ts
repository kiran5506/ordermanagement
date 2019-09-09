import { ToastrService } from "ngx-toastr";
import { UserService } from "./../services/user.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { DatabroadcastService } from "../services/databroadcast.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  cartProducts: any;
  user: any;
  cartGrandTotal: any;
  cartItemObj: any;
  totBaramount = 0;
  totCementamount = 0;
  totGrandamount = 0;
  updateCart: any;
  //cartItemsLength: any;
  @Output() totalEvent = new EventEmitter<any>();
  constructor(
    private cartService: UserService,
    private toasterService: ToastrService,
    private router: Router,
    private databroadcastService: DatabroadcastService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));

    this.loadCartPage();
    this.cartItems();
    //console.log("cartItems", this.cartItems.length);
  }

  public loadCartPage() {
    if (this.user != null) {
      this.databroadcastService.isShowhide.emit(true);
    } else {
      this.databroadcastService.isShowhide.emit(false);
    }
  }

  cartItems() {
    this.totGrandamount = 0;
    if (this.user == null) {
      // this.cartItemsLength = 0;
      this.cartProducts = [];
      //  console.log("CartProducts", this.cartItemsLength);
      console.log("CartProductslogin", this.cartProducts);
    } else {
      let userId = {
        user_id: this.user.user_id
      };
      this.cartService.userCartList(userId).subscribe(resp => {
        this.cartProducts = resp.result;
        //this.cartItemsLength = this.cartProducts.length;
        //console.log("CartProducts", this.cartItemsLength);
        for (var j = 0; j < this.cartProducts.length; j++) {
          console.log("length", this.cartProducts.length);

          let itemTotalPrice =
            this.cartProducts[j].quantity * this.cartProducts[j].price;
          if (this.cartProducts[j].type_id == 1) {
            this.totCementamount = this.totCementamount + itemTotalPrice;
            resp.result[j]["totalPrice"] = this.totCementamount;
            this.totGrandamount = this.totGrandamount + this.totCementamount;
            console.log("cement-->", this.totCementamount);
            this.totCementamount = 0;
          }
          if (this.cartProducts[j].type_id == 2) {
            if (this.cartProducts[j].bar_products.length > 0) {
              for (
                let k = 0;
                k < this.cartProducts[j].bar_products.length;
                k++
              ) {
                this.totBaramount =
                  this.totBaramount +
                  this.cartProducts[j].bar_products[k].quantity *
                    this.cartProducts[j].bar_products[k].value;
              }
              console.log("totBaramount", this.totBaramount);
              resp.result[j]["barTotal"] = this.totBaramount;
              this.totGrandamount = this.totGrandamount + this.totBaramount;
              console.log("bar-->", this.totBaramount);
              this.totBaramount = 0;
            }
          }
        }
        console.log("grand tot-->", this.totGrandamount);
      });
    }
  }

  chageCartValue(cartItem, bars, quantity, typeId) {
    console.log("cart item--->", cartItem);
    console.log("cart qty--->", quantity);
    console.log("bars--->", bars);

    if (typeId == 1) {
      this.updateCart = {
        user_id: this.user.user_id,
        type_id: typeId,
        prod_type_id: cartItem.prod_type_id,
        quantity: quantity,
        bar_products: []
      };
    } else {
      let bar_products = {
        bar_id: bars.id,
        quantity: quantity
      };
      this.updateCart = {
        user_id: this.user.user_id,
        type_id: typeId,
        prod_type_id: cartItem.prod_type_id,
        quantity: 0,
        bar_products: [bar_products]
      };
    }

    console.log("updateCartObject" , this.updateCart)
    this.cartService.addToCart(this.updateCart).subscribe(resp => {
      console.log("updateCartResponse", resp);
      if (resp.status == 200) {
        this.cartItems();
      }
    });
  }

  deleteCarItem(deleteVal, cartVal) {
    if (deleteVal == 1) {
      this.cartItemObj = {
        delete_all: 1,
        user_id: this.user.user_id
      };
    } else {
      this.cartItemObj = {
        delete_all: 0,
        user_id: this.user.user_id,
        cart_id: cartVal
      };
    }
    console.log("deleteOneItem", this.cartItemObj);
    this.cartService.userCartDelete(this.cartItemObj).subscribe(resp => {
      if (resp.status == 200) {
        this.cartItems();
        this.toasterService.error(resp.message);
      }
    });
  }

  checkOut() {
    if (this.cartProducts.length > 0) {
      console.log("totGrandamount", this.totGrandamount);
      this.databroadcastService.updataGrandTotal(this.totGrandamount);
      this.router.navigateByUrl("checkOut");
    } else {
    }
  }
  addItem() {
    this.router.navigateByUrl("home");
  }
}
