import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appStoreProviders } from './store/store';

import * as Init from './services/appload.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CorrelationInterceptor } from './services/corrleation.interceptor';
import { WebsocketConnectComponent } from './components/websocket-connect/websocket-connect.component';

import { DxDataGridModule } from 'devextreme-angular';
import { DxGridComponent } from './components/dx-grid/dx-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    WebsocketConnectComponent,
    DxGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    DxDataGridModule,
  ],
  providers: [
    appStoreProviders,
    Init.AppLoadService,
    Init.AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: Init.get_settings,
      deps: [Init.AppLoadService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CorrelationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
