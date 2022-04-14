import { Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { PackagesDTO } from '../packagesDTO';
import { Shipment } from '../shipment';

@Component({
  selector: 'app-root',
  templateUrl: './create-shipment.component.html',
  styleUrls: ['./create-shipment.component.scss'],
})
export class CreateShipmentComponent implements OnInit, OnDestroy {

  createShipmentForm: FormGroup;
  currencies: Array<String> = ['EUR', 'USD', 'GBP'];
  totalWeight$: Observable<number> = of(0);
  totalValue$: Observable<number> = of(0);
  totalPackages$: Observable<number> = of(0);
  destroy$: Subject<void> = new Subject<void>();
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addPackage() {
    if(this.packages.length >= 5) return;
    const newPackage =  this.createShipmentForm.value as Shipment;
    this.packages.push(newPackage);
    this.handleTotals(newPackage, this.packages);
  }

  private handleTotals(newPackage: Shipment, packages: Shipment[]): void {
    combineLatest([this.totalWeight$, this.totalValue$]).pipe(
      takeUntil(this.destroy$),
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