/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  let arr=str.split('-');
  return arr.map((item,index)=>index==0 ? item : item[0].toUpperCase()+item.slice(1)).join('');
}
