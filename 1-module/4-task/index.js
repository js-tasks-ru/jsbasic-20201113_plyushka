/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  if(str.toLowerCase().includes('1xBet'.toLowerCase()) || str.toLowerCase().includes('XXX'.toLowerCase())) return true;
  return false;
}
