import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductStoreModule } from './store/product-store.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AlertModule } from 'ngx-bootstrap/alert';


@NgModule({
    declarations: [
        ProductComponent,
        ProductCardComponent,
        ProductCatalogComponent,
        ProductFormComponent
    ],
    imports: [
        CommonModule,
        ProductRoutingModule, 
        FormsModule,
        ReactiveFormsModule,
        ProductStoreModule,
        AlertModule.forRoot(),
    ]
})
export class ProductModule { }
