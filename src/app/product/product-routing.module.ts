import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
    {
        path: '',
        component: ProductComponent,
        children: [
            {
                path: '',
                component: ProductCatalogComponent
            },
            {
                path: 'create',
                component: ProductFormComponent
            },
            {
                path: ':id',
                component: ProductFormComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
