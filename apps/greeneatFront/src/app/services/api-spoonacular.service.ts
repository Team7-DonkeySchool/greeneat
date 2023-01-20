import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Recipe } from '../typings';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiSpoonacularService extends ApiService {

  getApiSpoonacular(idRecipe: number) {
    return this.get(environment.baseUrlSpoonacular, idRecipe, 'information', this.getQueryParams());
  };

  getApiSpoonacularByName(name: string) {
    return this.get(environment.baseUrlSpoonacular, '', `search?apiKey=dbfb5a18aa1949a78c5aa7bb02494fd9&number=1&query=${name}`);
  }
/*     return this.get(environment.baseUrlSpoonacular, '', 'search', this.getQueryParams() + {
      number: 1,
      query: name
    }); */
    // https://api.spoonacular.com/recipes/search?apiKey=dbfb5a18aa1949a78c5aa7bb02494fd9&number=1&query="searchRequest"  };

  private getQueryParams()
  {
    return {
      apiKey: environment.spoonacularApiKey,
    };
  }
}
