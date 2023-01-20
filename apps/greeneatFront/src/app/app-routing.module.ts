import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeApiTestComponent } from './components/recipe-api-test/recipe-api-test.component';

const routes: Routes = [
  { 
    path: '',
    component: RecipeApiTestComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
