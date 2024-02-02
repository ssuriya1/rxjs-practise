import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FunctionsComponent } from './components/functions/functions.component';
import { PipeableOperatorsComponent } from './components/pipeable-operators/pipeable-operators.component';

const routes: Routes = [
  { path: 'functions', component: FunctionsComponent },
  { path: 'operators', component: PipeableOperatorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
