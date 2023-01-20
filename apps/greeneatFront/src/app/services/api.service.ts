import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../typings';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(protected http: HttpClient) { }

  get(baseUrl: string, id: string | number, spoonOption: string, options: any = {}) {
    return this.http
      .get<Recipe>(`${baseUrl}${id}/${spoonOption}`, { params: options })
  };
}
