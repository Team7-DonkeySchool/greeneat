import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ingredient, RequestedIngredients } from '../typings';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService extends ApiService {

  getIngredientsByName(name: string): Observable<RequestedIngredients> {

    return this.http
      .get<RequestedIngredients>(`${environment.baseUrlApiPlatform}ingredients?page=1&name=${name}`);

  }
}
