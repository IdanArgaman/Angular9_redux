import { Component } from '@angular/core';
import { AppStore } from './store/store';
import { MaterialActions } from './api/material.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  constructor(private store: AppStore) {}

  get state() {
    return this.store.getState();
  }

  update() {
    this.store.dispatch({
      type: MaterialActions.UPDATE_MATERIAL,
      payload: {
        position: 1,
        name: 'New Material',
        weight: 123456789,
        symbol: 'Z'
      }
    });
  }

}
