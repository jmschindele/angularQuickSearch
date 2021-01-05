import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import {HttpClientModule} from '@angular/common/http';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { QuickSearchComponent } from './quick-search/quick-search.component';


@NgModule({
  declarations: [
    AppComponent,
    QuickSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  entryComponents: [
    QuickSearchComponent,
  ],
  providers: [],
})
export class AppModule {

  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(QuickSearchComponent, {injector: this.injector});

    customElements.define('quick-search', el);

  }

 }
