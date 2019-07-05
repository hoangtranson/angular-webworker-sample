import { Component } from '@angular/core';
import { CalculationService } from './services/calculation.service';
import { NUMBER } from './enums/number.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  timeRunWebWorker: any;
  resultWebWorker: any;
  isWebWorkerRun: boolean;

  timeRunJS: any;
  resultJS: any;
  isJSRun: boolean;

  constructor(private calculationService: CalculationService){
    this.timeRunWebWorker = 0;
    this.resultWebWorker = [];
    this.isWebWorkerRun = false;

    this.timeRunJS = 0;
    this.resultJS = [];
    this.isJSRun = false;
  }

  get resWebWorker() {
    return this.isWebWorkerRun? '... calculating': `${this.resultWebWorker.length} element(s) found`;
  }

  get resJS() {
    return this.isJSRun? '... calculating': `${this.resultJS.length} element(s) found`;
  }

  runTestWorker() {
    if (typeof Worker !== 'undefined') {
      this.isWebWorkerRun = true;
      const t0 = performance.now();
      const elements = this.calculationService.createElement(NUMBER.TEN_MILLIONS);
      // Create a new
      const worker = new Worker('./app.worker', { type: 'module' });
      worker.postMessage(elements);

      worker.onmessage = ({ data }) => {
        this.resultWebWorker = data;
        this.isWebWorkerRun = false;
      };
      
      const t1 = performance.now();
      this.timeRunWebWorker = t1 - t0;
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      this.runTestThread();
    }

   
  }

  runTestThread() {
    this.isJSRun = true;
    const t0 = performance.now();
    const elements = this.calculationService.createElement(NUMBER.TEN_MILLIONS);
    this.resultJS = elements.slice().filter( num => {
      return this.calculationService.isPrimeNumber(num);
    });
    this.isJSRun = false;
    const t1 = performance.now();
    this.timeRunJS = t1 - t0;
  }
}
