import { Component, OnInit } from '@angular/core';
import { AppStore } from 'src/app/store/store';
import { ProductActions } from 'src/app/api/product.actions';

@Component({
  selector: 'app-dx-grid',
  templateUrl: './dx-grid.component.html',
  styleUrls: ['./dx-grid.component.css']
})
export class DxGridComponent implements OnInit {

  constructor(private store: AppStore) { }

  ngOnInit() {
  }

  get state() {
    return this.store.getState();
  }

  onSelectionChanged(e) {
    const product =  e.selectedRowsData[0];

    this.store.dispatch({
      type: ProductActions.SELECT_PRODUCT,
      payload: product
    });
  }
}
