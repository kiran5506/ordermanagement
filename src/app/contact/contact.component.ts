import { DatabroadcastService } from 'src/app/services/databroadcast.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  
  texto : string = 'map';
  lat : number = 17.6868;
  lng : number = 83.2185;
  zoom : number = 15;  
  user: any;
  constructor(private dataService : DatabroadcastService) { }

  ngOnInit() {

    this.user = localStorage.getItem("user")
    console.log("user" , this.user)

this.loadContactPage();
  }

  public loadContactPage(){
   
    if(this.user != null){
      this.dataService.isShowhide.emit(true)
    }else{
      this.dataService.isShowhide.emit(false)
    }
    

  }

}
