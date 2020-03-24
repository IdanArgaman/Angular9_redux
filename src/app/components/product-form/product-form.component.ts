import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/model/product.model';
import { AppStore } from 'src/app/store/store';
import { ProductActions } from 'src/app/api/product.actions';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productClone: IProduct = null;

  @Input()
  set product(product: IProduct) {
    this.productClone = JSON.parse(JSON.stringify(product));
  }

  constructor(private store: AppStore) { }

  ngOnInit(): void {
  }

  updateProduct() {
    this.store.dispatch({
      type: ProductActions.UPDATE_PRODUCT,
      payload: this.productClone
    });
  }

  deleteProduct() {
    this.store.dispatch({
      type: ProductActions.DELETE_PRODUCT,
      payload:  this.productClone
    });
  }

}
