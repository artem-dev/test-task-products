import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ProductEffects } from './product.effects';
import { reducer } from './product.reducer';
import { featureKey } from './product.state';

@NgModule({
  imports: [
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([ProductEffects])
  ]
})
export class ProductStoreModule { }
