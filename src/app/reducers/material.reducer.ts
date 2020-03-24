import { IMaterialData, IMaterialState } from '../model/material.model';
import { MaterialActions } from '../api/material.actions';

type ActionHandler = (state: IMaterialState, actType: any) => IMaterialState;

interface HandlersMap {
    [actionType: string]: ActionHandler;
}

const handlers: HandlersMap = {
    [MaterialActions.UPDATE_MATERIAL]: updateMaterial,
};

const SOME_INITIAL_STATE: IMaterialState = {
    materialData: [{
        position: 1,
        name: 'Hydrogen',
        weight: 1.0079,
        symbol: 'H'
      },
      {
        position: 2,
        name: 'Helium',
        weight: 4.0026,
        symbol: 'He'
      },
      {
        position: 3,
        name: 'Lithium',
        weight: 6.941,
        symbol: 'Li'
      },
      {
        position: 4,
        name: 'Beryllium',
        weight: 9.0122,
        symbol: 'Be'
      },
      {
        position: 5,
        name: 'Boron',
        weight: 10.811,
        symbol: 'B'
      },
      {
        position: 6,
        name: 'Carbon',
        weight: 12.0107,
        symbol: 'C'
      },
      {
        position: 7,
        name: 'Nitrogen',
        weight: 14.0067,
        symbol: 'N'
      },
      {
        position: 8,
        name: 'Oxygen',
        weight: 15.9994,
        symbol: 'O'
      },
      {
        position: 9,
        name: 'Fluorine',
        weight: 18.9984,
        symbol: 'F'
      },
      {
        position: 10,
        name: 'Neon',
        weight: 20.1797,
        symbol: 'Ne'
      },
    ]
};

export function createMaterialReducer() {
    return function materialReducer(state: IMaterialState = SOME_INITIAL_STATE, action): IMaterialState {

        if (handlers[action.type]) {
            return handlers[action.type](state, action);
        }

        return state;
    };
}

//////////////
// HANDLERS //
//////////////

function updateMaterial(state: IMaterialState, action: any) {
    const e = action.payload;

    const ds = state.materialData.map(item => item.position === e.position ? {
        ...item,
        ...e
    } : item);

    return {
        ...state,
        materialData: ds
    };
}


