import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS,
    HttpClient,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { v4 as uuidv4 } from "uuid";
import { productData } from "./product-data";

@Injectable()
export class FakeBackendHttpInterceptor implements HttpInterceptor {

    private data = productData;

    constructor(private http: HttpClient) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return this.handleRequests(req, next);
    }

    handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
        const { url, method } = req;

        if (url.endsWith("/products") && method === "GET") {
            return of(new HttpResponse({ status: 200, body: this.data })).pipe(delay(500));
        }


        if (url.endsWith("/products") && method === "POST") {
            const { body } = req.clone();
            const newProduct = { id: uuidv4(), ...body };
            this.data = [newProduct, ...this.data];
            return of(new HttpResponse({ status: 200, body: newProduct })).pipe(delay(500));
        }

        if (url.match(/\/products\/.*/) && method === 'GET') {
            const productId = this.getProductId(url);
            const findOne = this.data.find(item => item.id === productId);
            return of(new HttpResponse({ status: 200, body: findOne })).pipe(delay(500));
        }

        if (url.match(/\/products\/.*/) && method === 'PUT') {
            const { body } = req.clone();
            const productId = this.getProductId(url);
            const newProduct = { id: productId, ...body };
            this.data = this.data.map((item) =>
                item.id === productId ? { ...item, ...newProduct } : item
            );
            return of(new HttpResponse({ status: 200, body: newProduct })).pipe(delay(500));
        }

        if (url.match(/\/products\/.*/) && method === "DELETE") {
            const productId = this.getProductId(url);
            this.data = this.data.filter(item => item.id !== productId);
            return of(new HttpResponse({ status: 200, body: productId })).pipe(
                delay(500)
            );
        }

        return next.handle(req);
    }


    getProductId(url: any) {
        const urlValues = url.split("/");
        return urlValues[urlValues.length - 1];
    }
}


export let fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendHttpInterceptor,
    multi: true,
};
