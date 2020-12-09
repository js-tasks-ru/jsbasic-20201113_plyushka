/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let arr = str.split(',').join(' ').split(' ').filter(item=>!isNaN(+ item)&&(item!='')).sort(function(a, b) { return a - b; });
  return result = {
    min: +arr[0],
    max: +arr[arr.length-1]
  }
}
