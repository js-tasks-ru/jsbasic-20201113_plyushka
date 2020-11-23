/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  if (n==0)  return 1;
  let result = 1;
  while(n){
    result = result * n;
    n--;
  }
  return result;
}
