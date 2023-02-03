import { Component, OnInit } from '@angular/core';
import { ApiSpoonacularService } from 'src/app/services/api-spoonacular.service';
import { Recipe } from 'src/app/typings';

@Component({
  selector: 'app-recipe-api-test',
  templateUrl: './recipe-api-test.component.html',
  styleUrls: ['./recipe-api-test.component.scss']
})
export class RecipeApiTestComponent implements OnInit{

  public title?: string;
  public image?: string;
  public searchInput: string = '';
  public idRecipe: number = 1;
  public titleResult?: string;
  public imageResult?: string;
  public recipes?: any;
  public ingredients?: any;
  public imageRecipeUrl: string = 'https://spoonacular.com/recipeImages/';

  constructor(private apiSpoonService: ApiSpoonacularService) {
  }

  ngOnInit(): void {
    this.apiSpoonService.getApiSpoonacularById(this.idRecipe).subscribe((data)=>{
      console.log(data);
      this.title = data.title;
      this.image = data.image;
      this.ingredients = data.extendedIngredients;
    });
  }

  public onSearchRecipe() {
    this.apiSpoonService.getApiSpoonacularByName(this.searchInput).subscribe((data)=>{
      this.recipes = data.results;
      console.log(this.recipes);
    });
  }
}
