import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ShipmentModule } from './shipment/shipment.module';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
