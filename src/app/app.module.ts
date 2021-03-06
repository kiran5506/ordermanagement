import { ToastrModule } from "ngx-toastr";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";
import { SharedModule } from "./shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./shared/security/auth.guard";
import { HomeComponent } from "./home/home.component";
import { CartComponent } from "./cart/cart.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AgmCoreModule } from "@agm/core";
import {
  LocationStrategy,
  HashLocationStrategy,
  PathLocationStrategy,
  CommonModule
} from "@angular/common";
import { CheckOutComponent } from "./check-out/check-out.component";
import { ThankYouComponent } from "./thank-you/thank-you.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckOutComponent,
    ThankYouComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB5ezxvUQ4rgV68spt7XE6mdEGpOGZLb50"
    }),
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: "toast-top-right",
      preventDuplicates: false
    })
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
