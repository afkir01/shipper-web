import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateShipmentComponent } from './shipment/create-shipment/create-shipment.component';

const routes: Routes = [
  {path: '', component: CreateShipmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
