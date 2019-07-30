import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ProductsService } from "./../services/products.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  cementProducts: any;
  barsProducts: any;
  addTocart: any;

  constructor(private productService: ProductsService) {}

  ngOnInit() {
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
    });
  }

  productValue(item, quantityEvent, index) {
    let totalPrice = quantityEvent * item.price;
    this.cementProducts[index]["totalPrice"] = totalPrice;
    this.cementProducts[index]["qty"] = quantityEvent;
    this.addTocart = this.cementProducts[index];
  }
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
    let totalPrice = quantityEvent * bar.value;
    let barsProducts = this.barsProducts;

    for (var k = 0; k < barsProducts.length; k++) {
      var barsList = barsProducts[itemIndex].barsList;
    
      for (var m = 0; m < barsList.length; m++) {
        barsList[barsIndex]["totalPrice"] = totalPrice;
        barsList[barsIndex]["quantity"] = quantityEvent;
      }
    }
    var totalCartPrice = barsList.reduce((a , b) => a + b.totalPrice,0)
    barsProducts[itemIndex]["totalCartPrice"] = totalCartPrice;

  }
}
