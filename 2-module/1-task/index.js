/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  let res=0;

  for(let key in salaries){
    if(!isNaN(Number(salaries[key]))){
      res = res + +salaries[key];
    }
  }

  return res;
}
