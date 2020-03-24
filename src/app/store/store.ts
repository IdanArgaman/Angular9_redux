import { createStore,  Store, StoreEnhancer,  applyMiddleware,
  Dispatch, Reducer, Unsubscribe, combineReducers } from 'redux';

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import { IAppState } from './model';
import { rootReducer, reducerMap } from './reducer';

const devtools: StoreEnhancer <IAppState> =
  window['devToolsExtension'] ?
  window['devToolsExtension']() : f => f;

export function createAppStore(): Store <IAppState> {

  // CREATE //

  const store = <AppStore>createStore <IAppState> (
    rootReducer, composeWithDevTools(applyMiddleware(thunk, createLogger()))
  );

  // EXTEND //

  store.currentReducerMap = reducerMap;

  store.extendReducer = (reducerKey) => {

    store.currentReducerMap = {
      ...store.currentReducerMap,
      ...reducerKey
    };

    store.replaceReducer(combineReducers(store.currentReducerMap));
  };

  // DEBUG //

  (<any>window).app = {
    store,
    get state() {
      return store.getState();
    }
  };

  return store;
}

export abstract class AppStore {
  currentReducerMap: { [key: string]: Reducer<any> }; // CUSTOM

  abstract dispatch: Dispatch<IAppState>;
  abstract getState(): IAppState;
  abstract subscribe(listener: () => void): Unsubscribe;
  abstract replaceReducer(nextReducer: Reducer<IAppState>): void;

  abstract extendReducer(reducerKey: { [key: string]: Reducer<any> }); // CUSTOM
}

export const appStoreProviders = [{
  provide: AppStore,
  useFactory: createAppStore
}];
