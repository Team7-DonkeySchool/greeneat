import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArrayProductsOpenFoodFacts } from '../typings';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiOpenfoodfactsService extends ApiService {
  
  getOpenFoodFactsProductByName(productName: string) : Observable<ArrayProductsOpenFoodFacts>{

    let queryParams = new HttpParams();
    queryParams = queryParams.append("search_terms", productName);
    queryParams = queryParams.append("search_simple", 1);
    queryParams = queryParams.append("action", "process");
    queryParams = queryParams.append("json", 1);

    return this.http
      .get<ArrayProductsOpenFoodFacts>(`${environment.baseUrlOpenfoodFacts}search.pl`, {params: queryParams})
  };

}
