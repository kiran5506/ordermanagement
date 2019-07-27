import { SidebarComponent } from "./sidebar/sidebar.component";
import { ProfileComponent } from "./profile/profile.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserLayoutRoutingModule } from "./user-layout.routing.module";
import { UserLayoutComponent } from "./user-layout.component";

@NgModule({
  declarations: [
    ProfileComponent,
    MyOrdersComponent,
    SidebarComponent,
    UserLayoutComponent
  ],
  imports: [UserLayoutRoutingModule],
  exports: [SidebarComponent]
})
export class UserLayoutModule {}
