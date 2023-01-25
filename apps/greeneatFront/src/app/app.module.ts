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
import { InputIngredientComponent } from './components/input-ingredient/input-ingredient.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeApiTestComponent,
    OpenfoodfactsApiTestComponent,
    HomeComponent,
    IngredientsTestsComponent,
    InputIngredientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
