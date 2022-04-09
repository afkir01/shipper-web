import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() { }

  convert(currencyFrom: string, currencyTo: string, value: number): number{
    return 5;
  }
}
