import { Action, createReducer, on } from '@ngrx/store';
import * as productState from './product.state';
import * as productActions from './product.actions';

const productReducer = createReducer(
    productState.initialstate,
    // SELECT ONE
    on(productActions.SelectProduct, (state, { id }) => ({
        ...state,
        selectedId: id
    })),
    // FIND ALL
    on(productActions.findAllProducts, (state) => ({
        ...state,
        action: productActions.type.FIND_ALL_PRODUCTS,
        loading: true,
        error: null,
    })),
    on(productActions.findAllProductsSuccess, (state, { products }) => {
        return productState.adapter.addMany(products, {
            ...state,
            loading: false,
        });
    }),
    on(productActions.findAllProductsFail, (state, { error }) => ({
        ...state,
        error: { ...error },
        loading: false,
    })),
    // FIND ONE
    on(productActions.findOneProduct, (state) => ({
        ...state,
        action: productActions.type.FIND_ONE_PRODUCT,
        loading: true,
        error: null,
    })),
    on(productActions.findOneSuccess, (state, { product }) => {
        return productState.adapter.setOne(product, {
            ...state,
            loading: false,
        });
    }),
    on(productActions.findOneProductFail, (state, { error }) => ({
        ...state,
        error: { ...error },
        loading: false,
    })),
    // CREATE
    on(productActions.createProduct, (state) => ({
        ...state,
        action: productActions.type.CREATE_PRODUCT,
        loading: true,
        error: null,
    })),
    on(productActions.createProductSuccess, (state, { product }) => {
        return productState.adapter.addOne(product, {
            ...state,
            loading: false,
        });
    }),
    on(productActions.createProductFail, (state, { error }) => ({
        ...state,
        error: { ...error },
        loading: false,
    })),
    // UPDATE
    on(productActions.updateProduct, (state) => ({
        ...state,
        action: productActions.type.UPDATE_PRODUCT,
        loading: true,
        error: null,
    })),
    on(productActions.updateProductSuccess, (state, { product }) => {
        return productState.adapter.updateOne({ id: product.id, changes: product }, {
            ...state,
            loading: false,
        });
    }),
    on(productActions.updateProductFail, (state, { error }) => ({
        ...state,
        error: { ...error },
        loading: false,
    })),
    // PATCH
    on(productActions.patchProduct, (state) => ({
        ...state,
        action: productActions.type.PATCH_PRODUCT,
        loading: true,
        error: null,
    })),
    on(productActions.patchProductSuccess, (state, { product }) => {
        return productState.adapter.updateOne({ id: product.id, changes: product }, {
            ...state,
            loading: false,
        });
    }),
    on(productActions.patchProductFail, (state, { error }) => ({
        ...state,
        error: { ...error },
        loading: false,
    })),
    // DELETE
    on(productActions.deleteProduct, (state) => ({
        ...state,
        action: productActions.type.DELETE_PRODUCT,
        loading: true,
        error: null,
    })),
    on(productActions.deleteProductSuccess, (state, { id }) => {
        return productState.adapter.removeOne(id, {
            ...state,
            loading: false,
        });
    }),
    on(productActions.patchProductFail, (state, { error }) => ({
        ...state,
        error: { ...error },
        loading: false,
    })),
);

export function reducer(state: productState.ProductsState, action: Action) {
    return productReducer(state, action);
}
