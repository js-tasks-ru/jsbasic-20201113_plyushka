/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  for(let row of table.tBodies[0].rows){
    let status = row.cells[3].getAttribute('data-available');
    if (status=='true') {
      row.classList.add('available');
    }else if (status=='false') {
      row.classList.add('unavailable');
    }else {
      row.setAttribute('hidden','');
    }
    row.classList.add(row.cells[2].innerHTML=='m'?'male':'female');
    row.style.textDecoration=+row.cells[1].innerHTML<18?'line-through':'';
  }
}
