import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    let cartItem = this.cartItems.find(item => item.product.id == product.id)
    if(cartItem) {
      cartItem.count++;
    } else {
      cartItem = {product:product,count:1};
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id == productId)

    cartItem.count+= amount;
    cartItem.count ==0 ? this.cartItems.splice(this.cartItems.indexOf(cartItem),1) : '';

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((count,item)=>count + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum,item)=>sum + item.product.price * item.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    this.modal.div = document.createElement('DIV');
    for(let item of this.cartItems){
      this.modal.div.append(this.renderProduct(item.product, item.count));
    }
    this.modal.div.addEventListener("click", this.onModalBodyClick.bind(this));
    this.modal.div.append(this.renderOrderForm());
    this.modal.div.querySelector("form").onsubmit = this.onSubmit.bind(this),
    this.modal.setBody(this.modal.div);

    this.modal.open();
  }
  onModalBodyClick(event){
    if (event.target.closest(".cart-counter__button")) {
        let itemId = event.target.closest("[data-product-id]").dataset.productId;
        this.updateProductCount(itemId, event.target.closest(".cart-counter__button_plus") ? 1 : -1);
    }
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    let product = cartItem.product;
    let countItem = cartItem.count;
    if(this.modal){
      if(this.cartItems.length!=0){
        if(countItem!=0){
          this.modal.div.querySelector(`[data-product-id="${product.id}"] .cart-counter__count`).innerHTML = countItem;
          this.modal.div.querySelector(`[data-product-id="${product.id}"] .cart-product__price`).innerHTML="€" + (countItem * product.price).toFixed(2);
          this.modal.div.querySelector('.cart-buttons__info-price').innerHTML = "€" + this.getTotalPrice().toFixed(2);
        }else {
          this.modal.div.querySelector(`[data-product-id="${product.id}"]`).remove();
        }
      }else {
        this.modal.close()
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();
    let cartForm = document.querySelector('.cart-form');
    this.modal.div.querySelector('button[type="submit"]').classList.add("is-loading");

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(cartForm),
    }).then(response => {
      if (response.status==200) {
          this.modal.setTitle("Success!");
          this.modal.div.querySelector('button[type="submit"]').classList.remove("is-loading");
          this.cartItems = [];
          this.cartIcon.update(this);
          this.modal.setBody(createElement('<div class="modal__body-inner"><p>Order successful! Your order is being cooked :) <br>We’ll notify you about delivery time shortly.<br><img src="/assets/images/delivery.gif"></p></div>'));
      }
    });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
