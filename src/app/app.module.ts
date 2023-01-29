import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HttpInterceptorService } from './services/httpIntercepter.service';
import { SearchInputComponent } from './components/search-input/search-input.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, SearchInputComponent],
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
