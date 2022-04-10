import { createAction, props } from '@ngrx/store';
import { Product, ProductId } from '../product';

export enum type {
  SELECT_PRODUCT            = '[ Product ] Select a Product',
  FIND_ALL_PRODUCTS         = '[ Product ] Find All Products',
  FIND_ALL_PRODUCTS_FAIL    = '[ Product ] Find All Products Fail',
  FIND_ALL_PRODUCTS_SUCCESS = '[ Product ] Find All Products Success',
  FIND_ONE_PRODUCT          = '[ Product ] Find One Product',
  FIND_ONE_PRODUCT_FAIL     = '[ Product ] Find One Product Fail',
  FIND_ONE_PRODUCT_SUCCESS  = '[ Product ] Find One Product Success',
  CREATE_PRODUCT            = '[ Product ] Create Product',
  CREATE_PRODUCT_FAIL       = '[ Product ] Create Product Fail',
  CREATE_PRODUCT_SUCCESS    = '[ Product ] Create Product Success',
  UPDATE_PRODUCT            = '[ Product ] Update Product',
  UPDATE_PRODUCT_FAIL       = '[ Product ] Update Product Fail',
  UPDATE_PRODUCT_SUCCESS    = '[ Product ] Update Product Success',
  PATCH_PRODUCT             = '[ Product ] Patch Product',
  PATCH_PRODUCT_FAIL        = '[ Product ] Patch Product Fail',
  PATCH_PRODUCT_SUCCESS     = '[ Product ] Patch Product Success',
  DELETE_PRODUCT            = '[ Product ] Delete Product',
  DELETE_PRODUCT_FAIL       = '[ Product ] Delete Product Fail',
  DELETE_PRODUCT_SUCCESS    = '[ Product ] Delete Product Success',
}

export const SelectProduct          = createAction(type.SELECT_PRODUCT, props<{ id: string }>());
export const findAllProducts        = createAction(type.FIND_ALL_PRODUCTS);
export const findAllProductsFail    = createAction(type.FIND_ALL_PRODUCTS_FAIL, props<{ error: any }>());
export const findAllProductsSuccess = createAction(type.FIND_ALL_PRODUCTS_SUCCESS, props<{ products: Array<Product> }>());
export const findOneProduct         = createAction(type.FIND_ONE_PRODUCT, props<{ id: string }>());
export const findOneProductFail     = createAction(type.FIND_ONE_PRODUCT_FAIL, props<{ error: any }>());
export const findOneSuccess      = createAction(type.FIND_ONE_PRODUCT_SUCCESS, props<{ product: Product }>());
export const createProduct          = createAction(type.CREATE_PRODUCT, props<{ product: Omit<Product, ProductId> }>());
export const createProductFail      = createAction(type.CREATE_PRODUCT_FAIL, props<{ error: any }>());
export const createProductSuccess   = createAction(type.CREATE_PRODUCT_SUCCESS, props<{ product: Product }>());
export const updateProduct          = createAction(type.UPDATE_PRODUCT, props<{ product: Product }>());
export const updateProductFail      = createAction(type.UPDATE_PRODUCT_FAIL, props<{ error: any }>());
export const updateProductSuccess   = createAction(type.UPDATE_PRODUCT_SUCCESS, props<{ product: Product }>());
export const patchProduct           = createAction(type.PATCH_PRODUCT, props<{ id: string, product: Partial<Product> }>());
export const patchProductFail       = createAction(type.PATCH_PRODUCT_FAIL, props<{ error: any }>());
export const patchProductSuccess    = createAction(type.PATCH_PRODUCT_SUCCESS, props<{ product: Product }>());
export const deleteProduct          = createAction(type.DELETE_PRODUCT, props<{ id: string }>());
export const deleteProductFail      = createAction(type.DELETE_PRODUCT_FAIL, props<{ error: any }>());
export const deleteProductSuccess   = createAction(type.DELETE_PRODUCT_SUCCESS, props<{ id: string }>());
