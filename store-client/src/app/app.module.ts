import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/home/products/products.component';
import { ProductItemComponent } from './components/home/product-item/product-item.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ProductsComponent,
    ProductItemComponent,
    CartComponent,
    CartItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    MatGridListModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
