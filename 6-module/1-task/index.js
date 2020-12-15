/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;

		this.elem = document.createElement('TABLE');
    this.tbody = document.createElement('TBODY');
		this.elem.addEventListener('click', this.remove);

    let header = `
    <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
    </thead>`;
    this.elem.insertAdjacentHTML('afterBegin', header);

		for (const row of this.rows) {
			let template = `
      <tr>
				<td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.salary}</td>
        <td>${row.city}</td>
        <td><button>X</button></td>
			</tr>`;
			this.tbody.insertAdjacentHTML('beforeend', template);
		}
    this.elem.append(this.tbody);

		document.body.append(this.elem);
  }

  remove(ev) {
    if (ev.target.closest('tr') && ev.target.tagName=='BUTTON') {
      ev.target.closest('tr').remove();
    }
  }
}
