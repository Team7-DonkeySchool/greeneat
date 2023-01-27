import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ArrayRecipes, Recipe } from '../typings';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiSpoonacularService extends ApiService {

  /* set the number of recipes for the getApiSpoonacularByName method */
  quantityRecipesReceived = 3;

  getApiSpoonacularById(idRecipe: number): Observable<Recipe> {

    let queryParams = new HttpParams();
    queryParams = queryParams.append("apiKey", environment.spoonacularApiKey);

    return this.http
      .get<Recipe>(`${environment.baseUrlSpoonacular}/${idRecipe}/information`, {params: queryParams});
  }

  getApiSpoonacularByName(recipeName: string): Observable<ArrayRecipes> {

    let queryParams = new HttpParams();
    queryParams = queryParams.append("apiKey", environment.spoonacularApiKey);
    queryParams = queryParams.append("number", this.quantityRecipesReceived);
    queryParams = queryParams.append("query", recipeName);

    return this.http
      .get<ArrayRecipes>(`${environment.baseUrlSpoonacular}/search`, {params: queryParams});
  }

  getApiSpoonacular(idRecipe: number): Observable<Recipe[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("apiKey", environment.spoonacularApiKey);
    queryParams = queryParams.append("number", this.quantityRecipesReceived);
    queryParams = queryParams.append("number", idRecipe);

    return this.http
      .get<Recipe[]>(`${environment.randomRecipeSpoonacular}/${idRecipe}`, {params: queryParams});
  }

}
