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
  cartItemObj: any;
  totBaramount = 0;
  totCementamount = 0;
  totGrandamount = 0;

  constructor(
    private cartService: UserService,
    private toasterService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.cartItems();
  }

  cartItems() {
    let userId = {
      user_id: this.user.user_id
    };
    this.cartService.userCartList(userId).subscribe(resp => {
      this.cartProducts = resp.result;

      for (var j = 0; j < this.cartProducts.length; j++) {
        let grandTotal = this.cartProducts[j].totalPrice;
        //console.log("grand", grandTotal);
        let qty = this.cartProducts[j].quantity;
        //console.log("qty", qty);
        let price = this.cartProducts[j].price;
        let itemTotalPrice = qty * price;
        if(this.cartProducts[j].type_id == 1){
          this.totCementamount = this.totCementamount + itemTotalPrice;
          console.log("result--->", resp.result[j]);
          resp.result[j]["totalPrice"] = this.totCementamount;
          this.totGrandamount = this.totGrandamount + this.totCementamount;
        }
        /* kiran */
        if(this.cartProducts[j].type_id == 2){
          if(this.cartProducts[j].bar_products.length > 0){
            for (let k = 0; k < this.cartProducts[j].bar_products.length; k++) {
                this.totBaramount = this.totBaramount + (this.cartProducts[j].bar_products[k].quantity *this.cartProducts[j].bar_products[k].price); 
            }
           // console.log("result--->", resp.result[j]);
            resp.result[j]["barTotal"] =  this.totBaramount;
            this.totGrandamount = this.totGrandamount + this.totBaramount;
          }
        }
        
      }
      /* console.log(this.cartGrandTotal, "grandTotal");
      localStorage.setItem("cartItem", JSON.stringify(this.cartProducts));
      console.log("cartProducts", this.cartProducts); */
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
}
