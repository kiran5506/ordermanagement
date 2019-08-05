import { UserService } from "./../services/user.service";
import { Router } from "@angular/router";
import { ProductsService } from "./../services/products.service";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  cementProducts: any;
  cementQty: any;
  barsProducts: any;
  storeQuntity: any;

  constructor(
    private productService: ProductsService,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  ngOnInit() {
    localStorage.setItem("loadhompage", "true");
    localStorage.removeItem("cementQTY");
    this.barsProducts = JSON.parse(localStorage.getItem("barsArray"));
    localStorage.removeItem("barsArray");
    this.cementProducts;
    this.cementProductsList();
    this.barsproductsList();
  }

  cementProductsList() {
    this.productService.getCementProducts().subscribe(resp => {
      for (var i = 0; i < resp.product.length; i++) {
        resp.product[i]["qty"] = "";
        resp.product[i]["totalPrice"] = "";
        resp.product[i]["type_id"] = "1";
      }
      this.cementProducts = resp.product;
      console.log("cementProducts", this.cementProducts);
    });
  }

  productValue(item, quantityEvent, index) {
    let cementTotalPrice = quantityEvent * item.price;
    this.cementProducts[index]["totalPrice"] = cementTotalPrice;
    this.cementProducts[index]["qty"] = quantityEvent;
    localStorage.setItem(
      "addToCart",
      JSON.stringify(this.cementProducts[index])
    );
    localStorage.setItem(
      "cementQTY",
      JSON.stringify([{ quantityEvent, index }])
    );
  }

  /*                                 Bars Integration                                       */

  barsproductsList() {
    this.productService.getBarsProducts().subscribe((response: any) => {
      for (var i = 0; i < response.product.length; i++) {
        let barsList = response.product[i].barsList;

        for (var j = 0; j < barsList.length; j++) {
          barsList[j]["quantity"] = "";
          barsList[j]["totalPrice"] = "";
          response.product[i]["totalCartPrice"] = "";
        }
      }
      this.barsProducts = response.product;
    });
  }

  barsQuntity(bar, quantityEvent, itemIndex, barsIndex) {
    let barsTotalPrice = quantityEvent * bar.value;
    let barsProducts = this.barsProducts;

    for (var k = 0; k < barsProducts.length; k++) {
      var barsList = barsProducts[itemIndex].barsList;

      console.log("barsList", barsList);
      for (var m = 0; m < barsList.length; m++) {
        barsList[barsIndex]["totalPrice"] = barsTotalPrice;
        barsList[barsIndex]["quantity"] = quantityEvent;
      }
    }
    var totalCartPrice = barsList.reduce((a, b) => a + b.totalPrice, 0);
    barsProducts[itemIndex]["totalCartPrice"] = totalCartPrice;
    localStorage.setItem(
      "barsQTY",
      JSON.stringify([{ quantityEvent, itemIndex, barsIndex }])
    );
    localStorage.removeItem("barsArray");
    localStorage.setItem("barsArray", JSON.stringify(this.barsProducts));
  }

  itemAddToCart(cartIndex) {
    let user = JSON.parse(localStorage.getItem("user"));
    let cementQuntity = JSON.parse(localStorage.getItem("cementQTY"));
    let barsQuntity = JSON.parse(localStorage.getItem("barsQTY"));
    console.log("barsQuntity", barsQuntity);
    let cart = JSON.parse(localStorage.getItem("addToCart"));
    console.log(cart);
    let login = localStorage.getItem("isOMlogin");
    if (login == "false" || login == null) {
      this.router.navigateByUrl("login");
    } else {
      if (cementQuntity == null) {
        this.toastrService.info("please enter quntity");
      } else {
        for (var o = 0; o < cementQuntity.length; o++) {
          var itemIndex = cementQuntity[o].index;
          var cement = cementQuntity[o].quantityEvent;
        }

        if (itemIndex === cartIndex) {
          if (cement < 1 || cement == "") {
            this.toastrService.info("please enter valid quntity");
          } else {
            if (cart.type_id == 1) {
              var cartDetails = {
                user_id: user.user_id,
                type_id: cart.type_id,
                prod_type_id: cart.prod_cement_id,
                quantity: cart.qty,
                bar_products: []
              };
            } else {
            }
            console.log("cartDetails", cartDetails);
            this.userService.addToCart(cartDetails).subscribe(resp => {
              console.log("cartResp", resp);
              this.toastrService.success("item add into cart");
              localStorage.removeItem("addToCart");
            });
          }
        } else {
          this.toastrService.info("please enter quntity");
        }
      }
    }
  }
}
