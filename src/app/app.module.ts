import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FunctionsComponent } from './components/functions/functions.component';
import { PipeableOperatorsComponent } from './components/pipeable-operators/pipeable-operators.component';

@NgModule({
  declarations: [
    AppComponent,
    FunctionsComponent,
    PipeableOperatorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
