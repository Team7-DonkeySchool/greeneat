import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeApiTestComponent } from './components/recipe-api-test/recipe-api-test.component';
import { OpenfoodfactsApiTestComponent } from './components/openfoodfacts-api-test/openfoodfacts-api-test.component';
import { HomeComponent } from './components/home/home.component';
import { UserrecipeComponent } from './components/userrecipe/userrecipe.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeApiTestComponent,
    OpenfoodfactsApiTestComponent,
    HomeComponent,
    UserrecipeComponent,
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
