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

  constructor() { }

  ngOnInit() {
  }

}
