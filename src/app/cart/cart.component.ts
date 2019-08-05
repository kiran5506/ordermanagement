import { ToastrService } from "ngx-toastr";
import { UserService } from "./../services/user.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  cartProducts: any;
  user: any;
  cartGrandTotal: any;

  constructor(
    private cartService: UserService,
    private toasterService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    let userId = {
      user_id: this.user.user_id
    };
    this.cartService.userCartList(userId).subscribe(resp => {
      this.cartProducts = resp.result;

      for (var j = 0; j < this.cartProducts.length; j++) {
        let grandTotal = this.cartProducts[j].totalPrice;
        console.log("grand", grandTotal);
        let qty = this.cartProducts[j].quantity;
        console.log("qty", qty);
        let price = this.cartProducts[j].price;
        let itemTotalPrice = qty * price;
        for (var m = 0; m < resp.result.length; m++) {
          resp.result[j]["totalPrice"] = itemTotalPrice;
          resp.result["grandTotal"] = "";
        }
      }
      this.cartGrandTotal = this.cartProducts.reduce(
        (a, b) => a + b.totalPrice,
        0
      );

      console.log(this.cartGrandTotal, "grandTotal");
      localStorage.setItem("cartItem", JSON.stringify(this.cartProducts));
      console.log("cartProducts", this.cartProducts);
    });
  }

  cartValue(cart, quantity, index) {
    let cartItem = JSON.parse(localStorage.getItem("cartItem"));
    console.log(cartItem, "cartItem");

    for (var l = 0; l < cartItem.length; l++) {
      var typeId = cartItem[index].type_id;
      var prodId = cartItem[index].prod_type_id;
      console.log("typeId", typeId);
    }
    let price = cart.price;
    var cartItemPrice = price * quantity;
    for (var k = 0; k < this.cartProducts.length; k++) {
      let cartitem = this.cartProducts[k].totalPrice;
      console.log(cartitem, "cartitem");
      this.cartProducts[index]["totalPrice"] = cartItemPrice;

      let updateCart = {
        user_id: this.user.user_id,
        type_id: typeId,
        prod_type_id: prodId,
        quantity: quantity,
        bar_products: []
      };
      console.log("updatecart", updateCart);
      this.cartService.addToCart(updateCart).subscribe(resp => {
        console.log("cartUpdate", resp);
      });

      this.cartGrandTotal = this.cartProducts.reduce(
        (a, b) => a + b.totalPrice,
        0
      );
      console.log("grandTotal", this.cartGrandTotal);
    }
  }

  deleteAll() {
    let cartDelete = {
      delete_all: 1,
      user_id: this.user.user_id
    };
    this.cartService.userCartDelete(cartDelete).subscribe(resp => {
      if (resp.status == 200) {
        this.router.navigateByUrl("cart");
        this.toasterService.error("All CartItems Deleted");
      }
      console.log("deleteCart", resp);
    });
  }

  //  deleteOneitem(index){
  //   let userId = {
  //         user_id: this.user.user_id
  //       };
  // this.cartService.userCartList(userId).splice()

  //  }

  deleteOneItem(index) {
    let cartItem = JSON.parse(localStorage.getItem("cartItem"));
    for (var n = 0; n < cartItem.length; n++) {
      var cartId = cartItem[index].cart_id;
      console.log("cartId", cartId);
    }
    let cartItemDelete = {
      delete_all: 0,
      user_id: this.user.user_id,
      cart_id: cartId
    };
    this.cartService.userCartDelete(cartItemDelete).subscribe(resp => {
      if (resp.status == 200) {
        this.toasterService.error("cart item Deleted");
      }
      console.log("deleteOneItem", resp);
    });
  }
}
