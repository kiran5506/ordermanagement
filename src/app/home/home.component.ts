import { UserService } from "./../services/user.service";
import { Router } from "@angular/router";
import { ProductsService } from "./../services/products.service";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { DatabroadcastService } from "../services/databroadcast.service";

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
  user: any;
  cementQuantity: any;

  constructor(
    private productService: ProductsService,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router,
    private databroadcastService: DatabroadcastService
  ) {}
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));

    this.loadHomepage();
    this.cementProductsList();
    this.barsproductsList();
  }

  public loadHomepage() {
    if (this.user != null) {
      this.databroadcastService.isShowhide.emit(true);
    } else {
      this.databroadcastService.isShowhide.emit(false);
    }
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

    let cementProductId = item.prod_cement_id;
    this.cementQuantity = { quantityEvent, index, cementProductId };

    console.log("productId", cementProductId);
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
    let barsQuntity = JSON.parse(localStorage.getItem("barsQTY"));
    let barsList = JSON.parse(localStorage.getItem("barsList"));
    console.log("barsList", barsList);

    if (this.user == null) {
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
                user_id: this.user.user_id,
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
        console.log(this.cementQuantity);
        if (this.cementQuantity == undefined) {
          this.toastrService.info("please enter quantity");
        } else {
          if (this.cementQuantity.index == cartIndex) {
            if (this.cementQuantity.quantityEvent == "") {
              this.toastrService.info("please enter quantity");
            } else {
              if (this.cementQuantity.index == cartIndex) {
                if (this.cementQuantity.quantityEvent < 1) {
                  this.toastrService.info("please enter valid quantity");
                } else {
                  var cartDetails = {
                    user_id: this.user.user_id,
                    type_id: cartType,
                    prod_type_id: this.cementQuantity.cementProductId,
                    quantity: this.cementQuantity.quantityEvent,
                    bar_products: []
                  };

                  console.log("cartDetails", cartDetails);

                  this.cementQuantity = null;
                  this.userService.addToCart(cartDetails).subscribe(resp => {
                    console.log("cartResp", resp);
                    this.toastrService.success("item add into cart");
                    this.cartItemsLength();
                  });
                }
              }
            }
          } else {
            this.toastrService.info("please enter quantity");
          }
        }
      }
    }
  }

  public cartItemsLength() {
    let userId = {
      user_id: this.user.user_id
    };
    this.userService.userCartList(userId).subscribe(resp => {
      let length = resp.result.length;
      console.log("length", length);
      this.databroadcastService.cartLength(resp.result.length);
    });
  }
}
