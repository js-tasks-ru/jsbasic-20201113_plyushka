export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = document.createElement('DIV');
    this.elem.classList.add('slider');

    this.elem.insertAdjacentHTML('afterBegin', `<div class="slider__thumb" >
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress"></div>`);

    this.div = document.createElement('DIV');
    this.div.classList.add('slider__steps');
    for (var i = 0; i < this.steps; i++) {
      let template = `<span data-order='${i}'></span>`;
      this.div.insertAdjacentHTML('beforeend', template);
    }
    this.elem.append(this.div);
    this.elem.querySelector('.slider__steps').children[value].classList.add('slider__step-active');
    let startPercents = value*100/(steps-1);
    this.elem.querySelector('.slider__thumb').style.left = `${startPercents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${startPercents}%`;

    this.elem.addEventListener('click',this.change.bind(this));
    this.elem.addEventListener('pointerdown',this.move.bind(this));
    document.body.append(this.elem);
  }

  change(){
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    console.log(approximateValue);
    let step = Math.round(approximateValue);
    if(event.target.tagName=='SPAN'){
      step = +event.target.dataset.order;
    }
    this.elem.querySelector('.slider__value').textContent=step;
    for(let span of this.elem.querySelector('.slider__steps').children){
      span.classList.remove('slider__step-active');
    }
    this.elem.querySelector('.slider__steps').children[step].classList.add('slider__step-active');

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    let leftPercents = step*100/segments; // Значение в процентах от 0 до 100

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    let myEvent  = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: step, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    });
    this.elem.dispatchEvent(myEvent);
  }

  move(event){
    let slider=this.elem;
    let steps=this.steps;
    event.preventDefault();
    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
    slider.classList.add('slider_dragging');
    let shiftX = event.clientX - thumb.getBoundingClientRect().left;

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);

    function onPointerMove(event) {
      let left = event.clientX - slider.getBoundingClientRect().left;
      let leftRelative = left / slider.offsetWidth;

      (leftRelative < 0) ? leftRelative = 0 : '';
      (leftRelative > 1) ? leftRelative = 1 : '';

      let leftPercents = leftRelative * 100;

      let thumb = slider.querySelector('.slider__thumb');
      let progress = slider.querySelector('.slider__progress');

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
      let segments = steps - 1;
      let approximateValue = leftRelative * segments;
      let step = Math.round(approximateValue);

      slider.querySelector('.slider__value').textContent=step;
      for(let span of slider.querySelector('.slider__steps').children){
        span.classList.remove('slider__step-active');
      }
      slider.querySelector('.slider__steps').children[step].classList.add('slider__step-active');
    }

    function onPointerUp() {
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('pointermove', onPointerMove);
      slider.classList.remove('slider_dragging');
      let step = +slider.querySelector('.slider__value').textContent;
      slider.querySelector('.slider__thumb').style.left = `${step*100/(steps-1)}%`;
      slider.querySelector('.slider__progress').style.width = `${step*100/(steps-1)}%`;

      let myEvent  = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: step, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      });
      slider.dispatchEvent(myEvent);
    }
  }
}
