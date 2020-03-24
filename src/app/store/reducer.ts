import { Reducer, combineReducers} from 'redux';
import { IAppState } from './model';

import { createMaterialReducer } from '../reducers/material.reducer';

export const reducerMap = {
    materialsState: createMaterialReducer()
};

export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>(reducerMap);




