/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  let arr = users.filter(item =>item.age<=age );
  let arr2 = arr.map(item => item.name +', '+item.balance);
  return arr2.join('\n');
}
