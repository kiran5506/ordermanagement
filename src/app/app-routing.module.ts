import { ThankYouComponent } from "./thank-you/thank-you.component";
import { CheckOutComponent } from "./check-out/check-out.component";
import { CartComponent } from "./cart/cart.component";
import { SignupComponent } from "./shared/signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./shared/login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/security/auth.guard";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signUp", component: SignupComponent },
  { path: "cart", component: CartComponent },
  {
    path: "user",
    loadChildren: "./user-layout/user-layout.module#UserLayoutModule",
    canActivate: [AuthGuard]
  },
  { path: "checkOut", component: CheckOutComponent, canActivate: [AuthGuard] },
  { path: "thankYou", component: ThankYouComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "top"
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
