import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IngredientsTestsComponent } from './components/ingredients-tests/ingredients-tests.component';
import { OpenfoodfactsApiTestComponent } from './components/openfoodfacts-api-test/openfoodfacts-api-test.component';
import { RecipeApiTestComponent } from './components/recipe-api-test/recipe-api-test.component';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent
  },
  { 
    path: 'spoonacular_recipes',
    component: RecipeApiTestComponent
  },
  { 
    path: 'openfoodfacts_ecoscore',
    component: OpenfoodfactsApiTestComponent
  },
  { 
    path: 'ingredients_tests',
    component: IngredientsTestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
