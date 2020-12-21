import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render(){
    this.elem = document.createElement('DIV');
    this.elem.classList.add('products-grid');
    this.renderContent();
  }

  renderContent(){
    if (this.div) {
      this.div.remove();
    }
    this.div = document.createElement('DIV');
    this.div.classList.add('products-grid__inner');

    for(let product of this.products){
      if (this.filters.noNuts && product.nuts) continue;
      if (this.filters.vegeterianOnly && !product.vegeterian) continue;
      if (!!this.filters.maxSpiciness && product.spiciness > this.filters.maxSpiciness) continue;
      if (this.filters.category && product.category != this.filters.category) continue;

      let card = new ProductCard(product);
      this.div.append(card.elem);
    }
    this.elem.append(this.div);
  }

  updateFilter(filters){
    Object.assign(this.filters, filters),
    this.renderContent();
  }
}
