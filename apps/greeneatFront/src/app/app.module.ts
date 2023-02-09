import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeApiTestComponent } from './components/recipe-api-test/recipe-api-test.component';
import { OpenfoodfactsApiTestComponent } from './components/openfoodfacts-api-test/openfoodfacts-api-test.component';
import { HomeComponent } from './components/home/home.component';
import { IngredientsTestsComponent } from './components/ingredients-tests/ingredients-tests.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InputIngredientsComponent } from './components/input-ingredients/input-ingredients.component';
import { SeasonalRecipesComponent } from './components/seasonal-recipes/seasonal-recipes.component';
import { PanelRecipeComponent } from './components/panel-recipe/panel-recipe.component';
import { YourRecipeComponent } from './components/your-recipe/your-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeApiTestComponent,
    OpenfoodfactsApiTestComponent,
    HomeComponent,
    IngredientsTestsComponent,
    NavbarComponent,
    InputIngredientsComponent,
    SeasonalRecipesComponent,
    PanelRecipeComponent,
    YourRecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
