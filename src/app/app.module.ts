import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HttpInterceptorService } from './services/httpIntercepter.service';
import { SearchInputComponent } from './components/search-input/search-input.component';

import { FormsModule } from '@angular/forms';
import { AddedCityComponent } from './components/added-city/added-city.component';
import { GridSystemComponent } from './components/grid-system/grid-system.component';
import { SpinerLoadingComponent } from './components/spiner-loading/spiner-loading.component';

@NgModule({
  declarations: [AppComponent, SearchInputComponent, AddedCityComponent, GridSystemComponent, SpinerLoadingComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
