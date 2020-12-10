function initCarousel() {
  function slide(arrow) {
    let direction = (arrow.classList.contains("carousel__arrow_right"))?'-1':'1'; //узнать направление движения
    let width = document.querySelector('.carousel__inner').offsetWidth; //ширина картинки
    let carousel__inner=document.querySelector('.carousel__inner');
    let position = + carousel__inner.style.transform.slice(11).slice(0,-3); //текущая позиция
    let res=position+width*direction; //новая позиция
    (position == -width*2)? document.querySelector('.carousel__arrow_right').style.display = 'none' : document.querySelector('.carousel__arrow_right').style.display = '';
    (position == -width)? document.querySelector('.carousel__arrow_left').style.display = 'none' : document.querySelector('.carousel__arrow_left').style.display = '';
    carousel__inner.style.transform = 'translateX('+ res +'px)';
  };

  document.querySelector('.carousel__arrow_left').style.display = 'none';
  document.querySelector('.carousel__arrow_right').addEventListener('click', {
    handleEvent(event) {
      slide(event.currentTarget);
    }
  });
  document.querySelector('.carousel__arrow_left').addEventListener('click', {
    handleEvent(event) {
      slide(event.currentTarget);
    }
  });
}
