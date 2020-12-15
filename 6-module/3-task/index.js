import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this.elem = document.createElement('DIV');
    this.elem.classList.add('carousel');

    this.div = document.createElement('DIV');
    this.div.classList.add('carousel__inner');

    this.elem.insertAdjacentHTML('afterBegin', `<div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>`);

    for (const slide of this.slides) {
      let oneSlide = `
      <div class="carousel__slide" data-id="penang-shrimp">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`;
      this.div.insertAdjacentHTML('beforeend', oneSlide);
    }
    this.elem.append(this.div);

    this.elem.querySelector('.carousel__arrow_left').style.display = 'none';
    this.elem.querySelector('.carousel__arrow_right').addEventListener('click',this.slide);
    this.elem.querySelector('.carousel__arrow_left').addEventListener('click',this.slide);

    this.elem.querySelector('.carousel__button').addEventListener('product-add',(event) => {
      let event = new CustomEvent("product-add", { // имя события должно быть именно "product-add"
        detail: this.slides.data-id, // Уникальный идентификатора товара из объекта товара
        bubbles: true // это событие всплывает - это понадобится в дальнейшем
      });
      this.elem.dispatchEvent(event);
    });
    document.body.append(this.elem);
  }

  slide() {
    let carousel__inner = this.parentElement.querySelector('.carousel__inner');
    let direction = (this.classList.contains("carousel__arrow_right"))?'-1':'1'; //узнать направление движения
    let width = carousel__inner.offsetWidth; //ширина картинки
    let cnt = carousel__inner.childElementCount; // количество слайдов
    let position = + carousel__inner.style.transform.slice(11).slice(0,-3); //текущая позиция
    let res=position+width*direction; //новая позиция

    (position == -width*(cnt-2) && direction==-1)? this.parentElement.querySelector('.carousel__arrow_right').style.display = 'none' : this.parentElement.querySelector('.carousel__arrow_right').style.display = '';
    (position == -width && direction==1)? this.parentElement.querySelector('.carousel__arrow_left').style.display = 'none' : this.parentElement.querySelector('.carousel__arrow_left').style.display = '';
    carousel__inner.style.transform = 'translateX('+ res +'px)';
  }
}
