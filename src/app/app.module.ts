import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyFancyComponentComponent } from './my-fancy-component/my-fancy-component.component';

@NgModule({
  declarations: [
    AppComponent,
    MyFancyComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
