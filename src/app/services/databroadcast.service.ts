import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DatabroadcastService {
  constructor() {}

  isShowhide = new EventEmitter<any>();
}
