import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../product';

export const adapter = createEntityAdapter<Product>({
  selectId: (sensor: Product) => sensor.id,
  sortComparer: false
});

export interface ProductsState extends EntityState<Product> {
  selectedId: string | null;
  action: string | null;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialstate: ProductsState = adapter.getInitialState({
  selectedId: null,
  action: null,
  loading: false,
  loaded: false,
  error: null
});

export const featureKey = 'products';
