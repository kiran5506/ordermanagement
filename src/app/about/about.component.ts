import { DatabroadcastService } from './../services/databroadcast.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
 
  user : any;
  constructor(private router: Router, private dataService:DatabroadcastService) { }
 
  ngOnInit() {

this.user = localStorage.getItem("user")
console.log("user" , this.user)

this.loadAboutPage();
  }

 public loadAboutPage(){

   if(this.user == null){

       this.dataService.isShowhide.emit(false)
     }else{
       this.dataService.isShowhide.emit(true)
   }

  }

  shopNow() {
    this.router.navigateByUrl("home");
  }
}
