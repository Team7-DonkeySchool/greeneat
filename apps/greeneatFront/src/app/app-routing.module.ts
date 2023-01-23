import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenfoodfactsApiTestComponent } from './components/openfoodfacts-api-test/openfoodfacts-api-test.component';
import { RecipeApiTestComponent } from './components/recipe-api-test/recipe-api-test.component';

const routes: Routes = [
  { 
    path: '',
    component: RecipeApiTestComponent
  },
  { 
    path: 'openfoodfacts',
    component: OpenfoodfactsApiTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
