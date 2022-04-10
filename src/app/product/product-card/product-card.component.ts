import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Product } from '../product';
import * as productActions from '../store/product.actions';
import * as productSelector from '../store/product.selectors';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnDestroy {
    @Input() product!: Product;
    private productStore$: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private store: Store
    ) {
        this.productStore$ = new Subscription();
    }

    ngOnInit(): void {
        this.productStore$.add(
            this.store.select(productSelector.isDeleteSuccess)
                .pipe(filter(done => !!done))
                .subscribe(() => console.log('Product deleted!')),
        );
    }

    ngOnDestroy(): void {
        this.productStore$?.unsubscribe();
    }


    onClickRemoveProduct(id: string): void {
        this.store.dispatch(productActions.deleteProduct({ id }));
    }

    onProductDetailNavigate(product: Product): void {
        this.router.navigate([product.id], { relativeTo: this.activatedRoute });
    }
}