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
  barProductItems = [];
  barCompanyId: any;

  constructor(
    private productService: ProductsService,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  ngOnInit() {
    localStorage.setItem("loadhompage", "true");
    localStorage.removeItem("cementQTY");
    this.cementProducts;
    this.cementProductsList();
    this.barsproductsList();
  }

  cementProductsList() {
    this.productService.getCementProducts().subscribe(resp => {
      for (var i = 0; i < resp.product.length; i++) {
        resp.product[i]["qty"] = "";
        resp.product[i]["totalPrice"] = "";
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
      "cementAddToCart",
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

  barsQuntity(bar, quantityEvent, itemIndex, barsIndex, prod_bar_company_id) {
    console.log("prod_bar_company_id--->", prod_bar_company_id);
    let barsTotalPrice = quantityEvent * bar.value;
    let barsProducts = this.barsProducts;

    for (var k = 0; k < barsProducts.length; k++) {
      var barsList = barsProducts[itemIndex].barsList;
      for (var m = 0; m < barsList.length; m++) {
        barsList[barsIndex]["totalPrice"] = barsTotalPrice;
        barsList[barsIndex]["quantity"] = quantityEvent;
      }
    }
    this.barCompanyId = prod_bar_company_id;
    let barProdObj = {
      bar_id: bar.prod_bar_id,
      quantity: quantityEvent
    };
    this.barProductItems.push(barProdObj);

    console.log("barsList--->", this.barProductItems);
    var totalCartPrice = barsList.reduce((a, b) => a + b.totalPrice, 0);
    barsProducts[itemIndex]["totalCartPrice"] = totalCartPrice;
    localStorage.setItem(
      "barsQTY",
      JSON.stringify([{ quantityEvent, itemIndex, barsIndex }])
    );
    localStorage.setItem("barsList", JSON.stringify(this.barsProducts));
  }

  itemAddToCart(cartIndex, cartType) {
    let user = JSON.parse(localStorage.getItem("user"));
    let cementQuntity = JSON.parse(localStorage.getItem("cementQTY"));
    let barsQuntity = JSON.parse(localStorage.getItem("barsQTY"));
    let cementCart = JSON.parse(localStorage.getItem("cementAddToCart"));
    let barsList = JSON.parse(localStorage.getItem("barsList"));
    console.log("barsList", barsList);
    let login = localStorage.getItem("isOMlogin");
    if (login == "false" || login == null) {
      this.router.navigateByUrl("login");
    } else {
      if (cartType == 2) {
        if (barsQuntity == null) {
          this.toastrService.info("please enter  quntity");
        } else {
          for (var p = 0; p < barsQuntity.length; p++) {
            var barsItemIndex = barsQuntity[p].itemIndex;
            var bars = barsQuntity[p].quantityEvent;
            console.log("bars", bars);
            var barIndex = barsQuntity[p].barsIndex;
          }
          if (cartIndex == barsItemIndex) {
            console.log("cartInex", cartIndex);
            if (bars < 1) {
              console.log("bars", bars);
              this.toastrService.info("please enter valid quantity");
            } else {
              let barsDetails = {
                user_id: user.user_id,
                type_id: cartType,
                prod_type_id: this.barCompanyId,
                quantity: 0,
                bar_products: this.barProductItems
              };

              console.log("barsObject-->", barsDetails);
              this.userService.addToCart(barsDetails).subscribe(resp => {
                console.log("cartResp", resp);
                this.toastrService.success("item add into cart");
                localStorage.removeItem("barsList");
                localStorage.removeItem("barsQTY");
              });
            }
          } else {
            this.toastrService.info("please enter quantity");
          }
        }
      } else {
        if (cementQuntity == null) {
          this.toastrService.info("please enter quantity");
        } else {
          for (var o = 0; o < cementQuntity.length; o++) {
            var itemIndex = cementQuntity[o].index;
            var cement = cementQuntity[o].quantityEvent;
          }

          if (itemIndex === cartIndex) {
            if (cement < 1 || cement == "") {
              this.toastrService.info("please enter valid quantity");
            } else {
              var cartDetails = {
                user_id: user.user_id,
                type_id: cartType,
                prod_type_id: cementCart.prod_cement_id,
                quantity: cementCart.qty,
                bar_products: []
              };

              console.log("cartDetails", cartDetails);
              this.userService.addToCart(cartDetails).subscribe(resp => {
                console.log("cartResp", resp);
                this.toastrService.success("item add into cart");
                localStorage.removeItem("cementQTY");
                localStorage.removeItem("addToCart");
              });
            }
          } else {
            this.toastrService.info("please enter quantity");
          }
        }
      }
    }
  }
}
