// import { CalculationService } from './services/calculation.service';

addEventListener('message', ({ data }) => {
  const isEvenNum = n => n%2===0 ? true : false;
  const evenList = data.filter( num => {
    return isEvenNum(num);
  });
  postMessage(evenList);
});
