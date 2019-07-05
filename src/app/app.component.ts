import { Component } from '@angular/core';
import { CalculationService } from './services/calculation.service';
import { NUMBER } from './enums/number.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private calculationService: CalculationService){}

  runTestWorker() {
    const t0 = performance.now();
    const elements = this.calculationService.createElement(NUMBER.TEN_MILLIONS);

    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker('./app.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        console.log(`page got message`, data);
      };
      worker.postMessage(elements);
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }

    const t1 = performance.now();
    console.log("Call to runWorker took " + (t1 - t0) + " milliseconds.");
  }

  runTestThread() {
    const t0 = performance.now();
    const elements = this.calculationService.createElement(NUMBER.TEN_MILLIONS);
    const evenList = elements.slice().filter( num => {
      return this.calculationService.isEvenNum(num);
    });
    console.log(`There are ${evenList.length} even element`);
    const t1 = performance.now();
    console.log("Call to runThread took " + (t1 - t0) + " milliseconds.");
  }
}
