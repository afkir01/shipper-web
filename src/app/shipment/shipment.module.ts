import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CreateShipmentComponent } from './create-shipment/create-shipment.component';
import { CreatePackageComponent } from "./create-package/create-package.component";

//Taiga UI


@NgModule({
  declarations: [
    CreateShipmentComponent,
    CreatePackageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
],
  providers: [],
  bootstrap: [CreateShipmentComponent]
})
export class ShipmentModule { }