import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { QuickSearchComponent } from './quick-search/quick-search.component';
import { DropDownMenuComponent } from './drop-down-menu/drop-down-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    QuickSearchComponent,
    DropDownMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
