import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../product';
import * as productActions from '../store/product.actions';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
    @Input() product!: Product;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private store: Store
    ) { }

    ngOnInit(): void { }

    onClickRemoveProduct(id: string): void {
        this.store.dispatch(productActions.deleteProduct({ id }));
    }

    onProductDetailNavigate(product: Product): void {
        this.router.navigate([product.id], { relativeTo: this.activatedRoute });
    }
}