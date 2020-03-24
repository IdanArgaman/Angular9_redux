import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/model/product.model';
import { AppStore } from 'src/app/store/store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() products: IProduct[];

  constructor(private store: AppStore) { }

  ngOnInit(): void {
  }
  
  get fliteredProducts() {
    const filter = this.store.getState().productsState.filter;
    if (filter) {
      return this.products.filter(p => p.name.includes(filter))
    } 

    return this.products;
  }

}
