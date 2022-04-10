import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ProductService } from '../product.service';
import * as productActions from '../store/product.actions';
import * as productSelector from '../store/product.selectors';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {
    productForm: FormGroup;
    isEditFlowActive = false;
    alerts: any[] = [];
    private currentProductIdOnEdit!: string;
    private productStore$: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private router: Router,
        private store: Store
    ) {
        this.productStore$ = new Subscription();
        this.productForm = this.initFormBuilder();
        this.prepareCreateOrUpdateFlow();
    }

    ngOnInit(): void {
        this.productStore$.add(
            this.store.select(productSelector.isCreateSuccess)
                .pipe(filter(done => done))
                .subscribe(() => {
                    this.resetForm();
                    this.alerts.push({
                        type: 'success',
                        msg: `Продукт добавлен успешно!`,
                        timeout: 2000
                    });
                })
        );
        this.productStore$.add(
            this.store.select(productSelector.isUpdateSuccess)
                .pipe(filter(done => done))
                .subscribe(() =>
                    this.alerts.push({
                        type: 'success',
                        msg: `Продукт обновлен успешно!`,
                        timeout: 2000
                    }))
        );

    }

    ngOnDestroy(): void {
        this.productStore$?.unsubscribe();
    }

    onNavigateToCatalog(): void {
        this.router.navigate(['..']);
    }

    onSubmit() {
        const controls = this.productForm.controls;
        const keys = Object.keys(this.productForm.value);
        if (this.productForm.invalid) {
            Object.keys(controls)
                .forEach(controlName => controls[controlName].markAsTouched());
            return;
        } else {
            this.onFormSubmit();
        }
    }

    isControlInvalid(controlName: string): boolean {
        const control = this.productForm.controls[controlName];
        const result = control.invalid && control.touched;
        return result;
    }

    private onFormSubmit(): void {
        if (this.isEditFlowActive) {
            const productToUpdate = { ...this.productForm.getRawValue(), id: this.currentProductIdOnEdit };
            this.store.dispatch(productActions.updateProduct({ product: productToUpdate }));
        } else {
            this.store.dispatch(productActions.createProduct({ product: this.productForm.getRawValue() }));
        }
    }

    private prepareCreateOrUpdateFlow() {
        this.productStore$.add(
            this.activatedRoute.params
                .subscribe(params => {
                    const idFromUrlParam: string = params && params.id;
                    if (idFromUrlParam) {
                        this.isEditFlowActive = true;
                        this.currentProductIdOnEdit = idFromUrlParam;
                        this.store.dispatch(productActions.SelectProduct({ id: idFromUrlParam }));
                        this.store.dispatch(productActions.findOneProduct({ id: idFromUrlParam }));
                        this.handleProductSelectedChanges(idFromUrlParam);
                    } else {
                        this.productForm.get('thumbnail')?.setValue(this.productService.getRamdomImgPath());
                    }
                }));
    }

    private initFormBuilder(): FormGroup {
        return new FormGroup({
            title: new FormControl({ value: '', disabled: false }, [Validators.required]),
            description: new FormControl({ value: '', disabled: false }, [Validators.required]),
            price: new FormControl({ value: '', disabled: false }, [Validators.required]),
            category: new FormControl({ value: '', disabled: false }, [Validators.required]),
            stock: new FormControl({ value: 1, disabled: false }, [Validators.required, Validators.min(1)]),
            brand: new FormControl({ value: '', disabled: false }, [Validators.required]),
            thumbnail: new FormControl({ value: '', disabled: false }, [Validators.required]),
        });
    }

    private handleProductSelectedChanges(id: string): void {
        this.productStore$.add(
            this.store.pipe(select(productSelector.selectCurrentProduct))
                .subscribe(productSelected => {
                    if (!!productSelected) {
                        const { price, description, category, thumbnail, title, stock, brand } = productSelected;
                        this.productForm.patchValue({
                            price,
                            stock,
                            description,
                            category,
                            thumbnail,
                            title,
                            brand
                        });
                    }
                })
        );
    }

    private resetForm(): void {
        this.productForm.reset();
    }

}
