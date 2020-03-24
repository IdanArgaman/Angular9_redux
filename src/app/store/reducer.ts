import { Reducer, combineReducers} from 'redux';
import { IAppState } from './model';

import { createProductReducer } from '../reducers/product.reducer';

export const reducerMap = {
    productsState: createProductReducer()
};

export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>(reducerMap);




