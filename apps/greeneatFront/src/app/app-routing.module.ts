import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { YourRecipeComponent } from './components/your-recipe/your-recipe.component';
import { IngredientsTestsComponent } from './components/ingredients-tests/ingredients-tests.component';
import { OpenfoodfactsApiTestComponent } from './components/openfoodfacts-api-test/openfoodfacts-api-test.component';
import { RecipeApiTestComponent } from './components/recipe-api-test/recipe-api-test.component';
import { InputIngredientsComponent } from './components/input-ingredients/input-ingredients.component';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'input-ingredient',
        pathMatch: 'full',
      },
      {
        path: 'input-ingredient',
        component: InputIngredientsComponent,
      },
      {
        path: 'your-recipe',
        component: YourRecipeComponent,
      },
    ],
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
  },
  { 
    path: 'your-recipe',
    component: YourRecipeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
