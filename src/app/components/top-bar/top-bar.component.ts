import { Component, OnInit } from '@angular/core';
import { AppStore } from 'src/app/store/store';
import { ProductActions } from 'src/app/api/product.actions';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  criteria: string = null;

  constructor(private store: AppStore) { }

  ngOnInit(): void {
  }

  addProduct() {
    this.store.dispatch({
      type: ProductActions.SELECT_PRODUCT,
      payload: {}
    });
  }

  onCriteriaChange(e) {
    this.store.dispatch({
      type: ProductActions.UPDATE_FILTER,
      payload: e
    });
  }
}
