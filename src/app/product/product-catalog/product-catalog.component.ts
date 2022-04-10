import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Product } from '../product';
import * as productActions from '../store/product.actions';
import * as productSelector from '../store/product.selectors';

@Component({
    selector: 'app-product-catalog',
    templateUrl: './product-catalog.component.html',
    styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    alerts: any[] = [];
    private productStore$!: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private store: Store
    ) {
        this.productStore$ = new Subscription();
        this.store.dispatch(productActions.findAllProducts());
    }

    ngOnInit(): void {
        this.productStore$.add(
            this.store.select(productSelector.selectAllProducts)
                .subscribe((products) => {
                    this.products = [...products];
                })
        );
        this.productStore$.add(
            this.store.select(productSelector.isDeleteSuccess)
                .pipe(filter(done => !!done))
                .subscribe(() => this.alerts.push({
                    type: 'success',
                    msg: `Продукт удален успешно!`,
                    timeout: 2000
                })),
        );
    }

    ngOnDestroy(): void {
        this.productStore$?.unsubscribe();
    }

    onNavigateToCreateProductView(): void {
        this.router.navigate(['create'], { relativeTo: this.activatedRoute });
    }

}