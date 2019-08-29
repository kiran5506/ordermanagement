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
  barProductItems: any;
  barCompanyId: any;
  user: any;
  cementQuantity: any;
  barProductsObject = [];
  cementList = [];

  constructor(
    private productService: ProductsService,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router,
    private databroadcastService: DatabroadcastService
  ) {}
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log("homeuser" , this.user.owner_name)

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

  /*                                    Cements Integration                               */

  cementProductsList() {
    this.productService.getCementProducts().subscribe(resp => {
      for (var i = 0; i < resp.product.length; i++) {
        resp.product[i]["qty"] = "";
        resp.product[i]["totalPrice"] = "0.00";
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
          response.product[i]["totalCartPrice"] = "0.00";
        }
      }
      this.barsProducts = response.product;
    });
  }

  barsQuntity(bar, quantityEvent, itemIndex, barsIndex, prod_bar_company_id) {
    //  console.log("prod_bar_company_id--->", prod_bar_company_id);
    let barsTotalPrice = quantityEvent * bar.value;
    let barsProducts = this.barsProducts;

    for (var k = 0; k < barsProducts.length; k++) {
      var barsList = barsProducts[itemIndex].barsList;
      for (var m = 0; m < barsList.length; m++) {
        barsList[barsIndex]["totalPrice"] = barsTotalPrice;
        barsList[barsIndex]["quantity"] = quantityEvent;
      }
    }
    var totalCartPrice = barsList.reduce((a, b) => a + b.totalPrice, 0);
    barsProducts[itemIndex]["totalCartPrice"] = totalCartPrice;

    this.barCompanyId = prod_bar_company_id;

    this.barProductItems = barsList;

    console.log("products", this.barsProducts);
  }

  /*                             Products Add To Cart                                          */

  itemAddToCart(cartIndex, cartType) {
    if (this.user == null) {
      this.router.navigateByUrl("login");
    } else {
      if (cartType == 1) {
        console.log("CementQuntityObject", this.cementQuantity);

        if (this.cementQuantity == undefined) {
          this.toastrService.info("please enter quantity");
          // this.cementList = [];
        } else {
          this.cementList.push(this.cementQuantity);

          console.log("camentList", this.cementList);
          for (var m = 0; m < this.cementList.length; m++) {
            var quntityCement = this.cementList[m].index;
            var quntityEvents = this.cementList[m].quantityEvent;
            console.log("camentListQuntity", quntityCement);
            console.log("quntityEvents", quntityEvents);
          }
          console.log("cartIndex", cartIndex);
          if (quntityCement == cartIndex) {
            if (quntityEvents < 1) {
              this.toastrService.info("please enter  valid quantity");
            }
          }

          // this.toastrService.info("please enter quantity index not equel");
        }
        // this.cementQuantity = null;

        // if (this.cementQuantity == undefined) {
        //   this.toastrService.info("please enter quantity");
        // } else {
        //   if (this.cementQuantity.index == cartIndex) {
        //     if (this.cementQuantity.quantityEvent == "") {
        //       this.toastrService.info("please enter quantity");
        //     } else {
        //       if (this.cementQuantity.index == cartIndex) {
        //         if (this.cementQuantity.quantityEvent < 1) {
        //           this.toastrService.info("please enter valid quantity");
        //         } else {
        //           var cartDetails = {
        //             user_id: this.user.user_id,
        //             type_id: cartType,
        //             prod_type_id: this.cementQuantity.cementProductId,
        //             quantity: this.cementQuantity.quantityEvent,
        //             bar_products: []
        //           };

        //           console.log("cartDetails", cartDetails);

        //           //this.cementQuantity = null;
        //           // this.userService.addToCart(cartDetails).subscribe(resp => {
        //           //   console.log("cartResp", resp);
        //           //   this.toastrService.success("item add into cart");
        //           //   // this.cartItemsLength();
        //           // });
        //         }
        //       }
        //     }
        //   } else {
        //     this.toastrService.info("please enter quantity");
        //   }
        // }
      } else {
        for (var j = 0; j < this.barsProducts.length; j++) {
          var barCartTotalPrice = this.barsProducts[cartIndex].totalCartPrice;
          console.log("barCartTotalPrice", barCartTotalPrice);
        }
        console.log(this.barsProducts, "total");

        if (this.barProductItems == undefined) {
          this.toastrService.info("please enter quntity");
        } else {
          if (barCartTotalPrice == 0 || barCartTotalPrice == "") {
            this.toastrService.info("please enter valid quntity");
          } else {
            console.log("barProductItems", this.barProductItems);
            for (var k = 0; k < this.barProductItems.length; k++) {
              var quntity = this.barProductItems[k].quantity;
              //console.log('quntity' , quntity)
              var typeId = this.barProductItems[k].prod_bar_id;
              //console.log('typeId',typeId)

              // console.log('object' , {quntity ,typeId })
              //  this.barProductsObject.push({quntity ,typeId })
              let barProdObj = {
                bar_id: typeId,
                quantity: quntity
              };
              this.barProductsObject.push(barProdObj);
              console.log("barProdObj", barProdObj);
              console.log("barProductsObject", this.barProductsObject);
            }

            let barsDetails = {
              user_id: this.user.user_id,
              type_id: cartType,
              prod_type_id: this.barCompanyId,
              quantity: 0,
              bar_products: this.barProductsObject
            };

            console.log("barsDetails", barsDetails);

            this.userService.addToCart(barsDetails).subscribe(resp => {
              console.log("cartResp", resp);
              this.toastrService.success("item add into cart");
            });
          }
        }
      }

      // if (cartType == 2) {
      //   if (barsQuntity == null) {
      //     this.toastrService.info("please enter  quntity");
      //   } else {
      //     for (var p = 0; p < barsQuntity.length; p++) {
      //       var barsItemIndex = barsQuntity[p].itemIndex;
      //       var bars = barsQuntity[p].quantityEvent;
      //       console.log("bars", bars);
      //       var barIndex = barsQuntity[p].barsIndex;
      //     }
      //     if (cartIndex == barsItemIndex) {
      //       console.log("cartInex", cartIndex);
      //       if (bars < 1) {
      //         console.log("bars", bars);
      //         this.toastrService.info("please enter valid quantity");
      //       } else {
      //         let barsDetails = {
      //           user_id: this.user.user_id,
      //           type_id: cartType,
      //           prod_type_id: this.barCompanyId,
      //           quantity: 0,
      //           bar_products: this.barProductItems
      //         };

      //         console.log("barsObject-->", barsDetails);
      //         // this.userService.addToCart(barsDetails).subscribe(resp => {
      //         //   console.log("cartResp", resp);
      //         //   this.toastrService.success("item add into cart");
      //         //   localStorage.removeItem("barsList");
      //         //   localStorage.removeItem("barsQTY");
      //         // });
      //       }
      //     } else {
      //       this.toastrService.info("please enter quantity");
      //     }
      //   }
      // } else {
    }
  }

  // public cartItemsLength() {
  //   let userId = {
  //     user_id: this.user.user_id
  //   };
  //   this.userService.userCartList(userId).subscribe(resp => {
  //     let length = resp.result.length;
  //     console.log("length", length);
  //     this.databroadcastService.cartLength(resp.result.length);
  //   });
  // }
}
