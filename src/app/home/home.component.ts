import { ProductsService } from "./../services/products.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.sass"]
})
export class HomeComponent implements OnInit {
  products: any;

  constructor(private productService: ProductsService) {}

  ngOnInit() {}

  productList() {
    this.productService.getProducts().subscribe(resp => {
      this.products = resp.product;
      console.log("productList", resp.product);
    });
  }
}
