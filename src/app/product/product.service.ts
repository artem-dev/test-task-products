import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Product, ProductId } from "./product";

@Injectable({
    providedIn: "root",
})
export class ProductService {
    constructor(private http: HttpClient) { }

    findAll(): Observable<Array<Product>> {
        return this.http.get<Array<Product>>(`${environment.api}/products`);
    }

    findById(id: string): Observable<Product> {
        return this.http.get<Product>(`${environment.api}/products/${id}`);
    }

    create(product: Omit<Product, ProductId>): Observable<Product> {
        return this.http.post<Product>(`${environment.api}/products`, product);
    }

    update(product: Product): Observable<Product> {
        const { id, ...fieldsToUpdate } = product;
        return this.http.put<Product>(`${environment.api}/products/${id}`, fieldsToUpdate);
    }

    partialUpdate(id: string, product: Partial<Product>): Observable<Product> {
        return this.http.patch<Product>(`${environment.api}/products/${id}`, product);
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${environment.api}/products/${id}`);
    }

    getRamdomImgPath(): string {
        const randomIdFrom1To100 = Math.floor((Math.random() * 100) + 1);
        return `https://dummyjson.com/image/i/products/${randomIdFrom1To100}/thumbnail.jpg`;
    }
}
