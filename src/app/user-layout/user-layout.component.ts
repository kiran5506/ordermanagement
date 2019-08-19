import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-layout",
  templateUrl: "./user-layout.component.html",
  styleUrls: ["./user-layout.component.scss"]
})
export class UserLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  public accordianData = [
    {
      id: 1,
      header: "header1",
      content: "example1"
    },
    {
      id: 2,
      header: "header2",
      content: "example2"
    },
    {
      id: 3,
      header: "header3",
      content: "example3"
    }
  ];
}
