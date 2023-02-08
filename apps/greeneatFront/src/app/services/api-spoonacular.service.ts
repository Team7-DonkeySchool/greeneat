import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ArrayRecipes, Recipe, RecipeArray, RecipeSpoonacular } from '../typings';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiSpoonacularService extends ApiService {

  /* set the number of recipes for the getApiSpoonacularByName method */
  private quantityRecipesReceived: number = 3;

  public getApiSpoonacularById(idRecipe: number): Observable<Recipe> {

    let queryParams = new HttpParams();
    queryParams = queryParams.append("apiKey", environment.spoonacularApiKey);

    return this.http
      .get<Recipe>(`${environment.baseUrlSpoonacular}/${idRecipe}/information`, {params: queryParams});
  }

  public getApiSpoonacularByName(recipeName: string): Observable<ArrayRecipes> {

    let queryParams = new HttpParams();
    queryParams = queryParams.append("apiKey", environment.spoonacularApiKey);
    queryParams = queryParams.append("number", this.quantityRecipesReceived);
    queryParams = queryParams.append("query", recipeName);

    return this.http
      .get<ArrayRecipes>(`${environment.baseUrlSpoonacular}/search`, {params: queryParams});
  }

  public getApiSpoonacularRandom(): Observable<RecipeArray> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("apiKey", environment.spoonacularApiKey);

    return this.http
      .get<RecipeArray>(`${environment.randomRecipeSpoonacular}`, {params: queryParams});
  }

  public postApiSpoonacularData(recipe: RecipeSpoonacular) {
    const headers = {'content-type': 'application/json'};
    console.log('body', recipe);
    return this.http.post(`${environment.baseUrlApiPlatform}recipes`, recipe, {'headers': headers});
  }

}
