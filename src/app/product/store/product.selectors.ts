import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState, featureKey, adapter } from './product.state';
import * as productActions from './product.actions';

const {
  selectEntities,
  selectAll
} = adapter.getSelectors();

const getProductState = createFeatureSelector<ProductsState>(featureKey);

const selectProductEntities = createSelector(getProductState, selectEntities);

const selectProductSensorId = createSelector(getProductState, (state: ProductsState) => state.selectedId);

export const selectAllProducts = createSelector(getProductState, selectAll);

export const selectCurrentProduct = createSelector(
  selectProductEntities,
  selectProductSensorId,
  (productEntities, productId) => productId && productEntities[productId]
);

export const isCreateSuccess = createSelector(getProductState, (state: ProductsState) =>
  state.action === productActions.type.CREATE_PRODUCT && !state.loading && !state.error);

export const isUpdateSuccess = createSelector(getProductState, (state: ProductsState) =>
  state.action === productActions.type.UPDATE_PRODUCT && !state.loading && !state.error);

export const isDeleteSuccess = createSelector(getProductState, (state: ProductsState) =>
  state.action === productActions.type.DELETE_PRODUCT && !state.loading && !state.error);
