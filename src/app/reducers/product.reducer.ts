import { IProductState } from '../model/product.model';
import { ProductActions } from '../api/product.actions';

type ActionHandler = (state: IProductState, actType: any) => IProductState;

interface HandlersMap {
    [actionType: string]: ActionHandler;
}

const handlers: HandlersMap = {
    [ProductActions.UPDATE_PRODUCT]: updateProduct,
    [ProductActions.SELECT_PRODUCT]: selectProduct,
    [ProductActions.DELETE_PRODUCT]: deleteProduct,
    [ProductActions.CREATE_PRODUCT]: createProduct,
    [ProductActions.UPDATE_FILTER]: updateProductFilter,

};

const SOME_INITIAL_STATE: IProductState = {
    products: [{
        id: 1,
        name: 'PC',
        creationDate: new Date(),
        price: 1000,
        description: 'Great for gaming'
      },
      {
        id: 2,
        name: 'PS2',
        creationDate: new Date(),
        price: 950,
        description: 'Great for gaming'
      },
      {
        id: 3,
        name: 'XBOX',
        creationDate: new Date(),
        price: 750,
        description: 'Great for gaming'
      },
      {
        id: 4,
        name: 'Mame',
        creationDate: new Date(),
        price: 200,
        description: 'Great for gaming'
      },
      {
        id: 5,
        name: 'Nintendo Switch',
        creationDate: new Date(),
        price: 500,
        description: 'Great for gaming'
      }
    ],
    selectedProduct: null,
    filter: null
};

export function createProductReducer() {
    return function productReducer(state: IProductState = SOME_INITIAL_STATE, action): IProductState {

        if (handlers[action.type]) {
            return handlers[action.type](state, action);
        }

        return state;
    };
}

//////////////
// HANDLERS //
//////////////

function updateProduct(state: IProductState, action: any) {
    const e = action.payload;

    const ds = state.products.map(item => item.id === e.id ? {
        ...item,
        ...e
    } : item);

    return {
        ...state,
        products: ds
    };
}

function selectProduct(state: IProductState, action: any) {
  const product = action.payload;

  return {
      ...state,
      selectedProduct: product
  };
}

function deleteProduct(state: IProductState, action: any) {
  const product = action.payload;
  const products = state.products.filter(p => p.id !== product.id );

  return {
      ...state,
      products,
      selectedProduct: null
  };
}

function createProduct(state: IProductState, action: any) {

  const products = [...state.products, {id: new Date().getTime(), ...action.payload}];

  return {
    ...state,
    products,
  };
}

function updateProductFilter(state: IProductState, action: any) {

  return {
    ...state,
    filter: action.payload,
  };
}




