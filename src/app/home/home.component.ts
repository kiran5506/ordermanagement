import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ProductsService } from "./../services/products.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  products: any;
  addtocart: any;
  productsForm: FormGroup;

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.cementProductsList();
  }
  cementProductsList() {
    this.productService.getProducts().subscribe(resp => {
      for (var i = 0; i < resp.product.length; i++) {
        resp.product[i]["qty"] = "";
        resp.product[i]["totalPrice"] = "";
      }
      this.products = resp.product;
    });
  }

  cart() {}

  productValue(item, quantityEvent, index) {
    let totalPrice = quantityEvent * item.price;
    this.products[index]["totalPrice"] = totalPrice;
    this.products[index]["qty"] = quantityEvent;
    this.addtocart = this.products[index];
    // console.log(this.catrtValue);
    console.log("productValue2", JSON.stringify(this.products[index]));
  }
}
