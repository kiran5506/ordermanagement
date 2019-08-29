import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { ProfileComponent } from "./profile/profile.component";
import { UserLayoutComponent } from "./user-layout.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from "@angular/common";

export const userRouter: Routes = [
  {
    path: "",
    component: UserLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "profile",
        pathMatch: "prefix"
      },
      { path: "profile", component: ProfileComponent },
      { path: "myOrders", component: MyOrdersComponent },
      // { path: "sidebar", component: SidebarComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(userRouter)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule {}
