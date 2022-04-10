import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { fakeBackendProvider } from './interceptors/fake-backend-interceptor.service';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
    declarations: [
        AppComponent,
        HeaderToolbarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot({})
    ],
    providers: [
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
