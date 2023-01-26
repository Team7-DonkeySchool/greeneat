import { Component, OnInit } from '@angular/core';
import { ApiSpoonacularService } from 'src/app/services/api-spoonacular.service';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-seasonal-recipes',
  templateUrl: './seasonal-recipes.component.html',
  styleUrls: ['./seasonal-recipes.component.scss']
})
export class SeasonalRecipesComponent {
  title?: string;
  image?: string;
  searchInput = '';
  idRecipe = 1;
  titleResult?: string;
  imageResult?: string;
  recipes?: any;
  ingredients?: any;
  imageRecipeUrl = 'https://spoonacular.com/recipeImages/';

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

  onSearchRecipe() {
    this.apiSpoonService.getApiSpoonacularByName(this.searchInput).subscribe((data)=>{
      this.recipes = data.results;
      // console.log(this.recipes);
    });
  }
}
