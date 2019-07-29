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
  {
    path: "user",
    loadChildren: "./user-layout/user-layout.module#UserLayoutModule",
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
