import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.elem = document.createElement('DIV');
    this.elem.classList.add('ribbon');

    this.nav = document.createElement('NAV');
    this.nav.classList.add('ribbon__inner');

    this.elem.insertAdjacentHTML('afterBegin', `<button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`);

    for (const category of this.categories) {
      let oneCategory = `
      <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`;
      this.nav.insertAdjacentHTML('beforeend', oneCategory);
    }
    this.elem.append(this.nav);
    this.elem.querySelector('.ribbon__inner').children[0].classList.add('ribbon__item_active');

    this.elem.insertAdjacentHTML('beforeend', `<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`);

    this.elem.querySelector('.ribbon__arrow_left').addEventListener('click',this.slide);
    this.elem.querySelector('.ribbon__arrow_right').addEventListener('click',this.slide);
    this.elem.querySelector('.ribbon__inner').addEventListener('scroll', function() {
      let scrollLeft = this.scrollLeft;
      let scrollRight = this.scrollWidth - this.scrollLeft - this.clientWidth;
      (scrollLeft==0)? this.parentElement.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible'):this.parentElement.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible');
      (scrollRight<1)? this.parentElement.querySelector('.ribbon__arrow_right').classList.remove('ribbon__arrow_visible'):this.parentElement.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
    });

    for(let category of this.elem.querySelectorAll('.ribbon__item')){
      category.addEventListener('click',(event) => {
        event.preventDefault();
        let myEvent = new CustomEvent("ribbon-select", {
          detail: category.dataset.id,
          bubbles: true
        });
        this.elem.dispatchEvent(myEvent);
        for(let item of category.parentElement.querySelectorAll('.ribbon__item')){
          item.classList.remove('ribbon__item_active');
        }
        category.classList.add('ribbon__item_active');
      });
    }
    document.body.append(this.elem);
  }

  slide() {
    let ribbon__inner = this.parentElement.querySelector('.ribbon__inner');
    let direction = (this.classList.contains("ribbon__arrow_right"))?'1':'-1'; //узнать направление движения
    let res = direction*350
    ribbon__inner.scrollBy(res, 0);
  }
}
