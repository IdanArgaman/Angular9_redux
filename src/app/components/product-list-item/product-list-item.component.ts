import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/model/product.model';
import { AppStore } from 'src/app/store/store';
import { ProductActions } from 'src/app/api/product.actions';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {

  @Input() product: IProduct;
  faCoffee = faCoffee;

  constructor(private store: AppStore) { }

  ngOnInit(): void {
  }

  deleteProduct() {
    this.store.dispatch({
      type: ProductActions.DELETE_PRODUCT,
      payload:  this.product
    });
  }

  select(product) {
    this.store.dispatch({
      type: ProductActions.SELECT_PRODUCT,
      payload: product
    });
  }

}
