// import { CalculationService } from './services/calculation.service';
declare function postMessage(message: any): void;

addEventListener('message', ({ data }) => {
  const isPrimeNumber  = n => {
    if (n === 2) return true // 2 is a special case
    if (n % 2 === 0) return false
    for (var i = 3; i <= Math.sqrt(n); i = i + 2) {
      if (!isPrimeNumber(i)) continue // <-- recursion here
      if (n % i === 0) return false
    }
    return true;
  }
  const primeNum = data.filter( num => {
    return isPrimeNumber(num);
  });

  postMessage(primeNum);
});
