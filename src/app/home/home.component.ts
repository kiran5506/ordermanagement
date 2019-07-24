import { ProductsService } from "./../services/products.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  products: any;
  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.cementProductsList();
  }

  cementProductsList() {
    this.productService.getProducts().subscribe(resp => {
      this.products = resp.product;

      console.log("response", resp);
    });
  }
}
