import { Injectable } from '@angular/core';
import { NUMBER } from '../enums/number.enum';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }
  createElement(num: NUMBER) {
    return Array.from(Array(num).keys())
  }

  isEvenNum(n){
    return n%2===0 ? true : false;
  }
}
