import { HeaderComponent } from "./header/header.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class SharedModule {}
