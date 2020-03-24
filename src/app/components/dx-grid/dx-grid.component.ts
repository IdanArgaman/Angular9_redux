import { Component, OnInit } from '@angular/core';
import { AppStore } from 'src/app/store/store';

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
}
