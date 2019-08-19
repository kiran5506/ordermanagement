import { DatabroadcastService } from "src/app/services/databroadcast.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-thank-you",
  templateUrl: "./thank-you.component.html",
  styleUrls: ["./thank-you.component.scss"]
})
export class ThankYouComponent implements OnInit {
  orderId: any;

  constructor(private dataService: DatabroadcastService) {}

  ngOnInit() {
    this.dataService.shareOrderId.subscribe(data => (this.orderId = data));
    this.dataService.isShowhide.emit(true);
  }
}
