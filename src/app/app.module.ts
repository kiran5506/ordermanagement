import { LoginComponent } from "./shared/login/login.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { SharedModule } from "./shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, HttpClientModule,NgbModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
