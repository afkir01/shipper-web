import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, combineLatestAll, concat, from, map, mergeMap, Observable, of } from 'rxjs';
import { PackagesDTO } from '../packagesDTO';
import { Shipment } from '../shipment';

@Component({
  selector: 'app-root',
  templateUrl: './create-shipment.component.html',
  styleUrls: ['./create-shipment.component.scss']
})
export class CreateShipmentComponent implements OnInit {

  createShipmentForm: FormGroup;
  currencies: Array<String> = ['EUR', 'USD', 'GBP'];
  totalWeight$: Observable<number> = of(0);
  totalValue$: Observable<number> = of(0);
  totalPackages$: Observable<number> = of(0);

  packages: Array<Shipment> = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createShipmentForm = this.fb.group({
      name: ['', [Validators.required,Validators.maxLength(32)]],
      weight: ['', [Validators.required]],
      value: ['',[Validators.required]],
      currency: ['', [Validators.required]],
    });
  }

  addPackage() {
    if(this.packages.length >= 5) return;
    const newPackage =  this.createShipmentForm.value as Shipment;
    this.packages.push(newPackage);
    this.handleTotals(newPackage, this.packages);
  }

  private handleTotals(newPackage: Shipment, packages: Shipment[]): void {
    combineLatest([this.totalWeight$, this.totalValue$]).pipe(
      map(([totalWeight, totalValue]) => {

          const packagesTotal = packages.length;
          const totalOfWeight = totalWeight + +newPackage.weight;
          const totalOfValue = totalValue + +newPackage.value;

          this.totalWeight$ = of(totalOfWeight),
          this.totalValue$ = of(totalOfValue),
          this.totalPackages$ = of(packagesTotal)
        
      }),
  ).subscribe();
  }

  onSubmit() {
    if (this.createShipmentForm.valid) {
      const packagesDTO: PackagesDTO = {
          packages: [
              ...this.packages
          ],
      };
      console.log(packagesDTO);
    }
  }
  
}