import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ProductService } from '../product.service';

import * as productActions from './product.actions';

@Injectable()
export class ProductEffects {

    findAllProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.findAllProducts),
            switchMap(() =>
                this.productService.findAll().pipe(
                    map((products) => productActions.findAllProductsSuccess({ products })),
                    catchError((error) => of(productActions.findAllProductsFail({ error })))
                )
            )
        )
    );

    findOneById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.findOneProduct),
            switchMap((action) =>
                this.productService.findById(action.id).pipe(
                    map((product) => productActions.findOneSuccess({ product })),
                    catchError((error) => of(productActions.findOneProductFail({ error })))
                )
            )
        )
    );

    createProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.createProduct), 
            tap(tt => console.log(tt)),           
            switchMap((action) =>
                this.productService.create(action.product).pipe(
                    tap(tt => console.log(tt)),
                    map((product) => productActions.createProductSuccess({ product })),
                    catchError((error) => of(productActions.createProductFail({ error })))
                )
            )
        )
    );

    updateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.updateProduct),
            switchMap((action) =>
                this.productService.update(action.product).pipe(
                    map((product) => productActions.updateProductSuccess({ product })),
                    catchError((error) => of(productActions.updateProductFail({ error })))
                )
            )
        )
    );

    patchProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.patchProduct),
            switchMap((action) =>
                this.productService.partialUpdate(action.id, action.product).pipe(
                    map((product) => productActions.patchProductSuccess({ product })),
                    catchError((error) => of(productActions.patchProductFail({ error })))
                )
            )
        )
    );

    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.deleteProduct),
            switchMap((action) =>
                this.productService.delete(action.id).pipe(
                    map(() => productActions.deleteProductSuccess({ id: action.id })),
                    catchError((error) => of(productActions.deleteProductFail({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }
}
