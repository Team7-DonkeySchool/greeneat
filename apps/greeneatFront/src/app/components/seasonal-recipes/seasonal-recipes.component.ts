import { Component, OnInit } from '@angular/core';
import { ApiSpoonacularService } from 'src/app/services/api-spoonacular.service';
import { Recipe } from 'src/app/typings';

@Component({
  selector: 'app-seasonal-recipes',
  templateUrl: './seasonal-recipes.component.html',
  styleUrls: ['./seasonal-recipes.component.scss']
})
export class SeasonalRecipesComponent implements OnInit{

  title?: string;
  image?: string;
  searchInput = '';
  idRecipe = 0;
  titleResult?: string;
  imageResult?: string;
  recipe?: any;
  ingredients?: any;
  imageRecipeUrl = 'https://spoonacular.com/recipeImages/';

  recipeArray? : Recipe[];

  constructor(private apiSpoonService: ApiSpoonacularService) {
  }

  ngOnInit(): void {
    this.recipeArray = [];
    for(let i = 0; i <= 4; i++) {
    this.apiSpoonService.getApiSpoonacular(this.idRecipe).subscribe((data)=>{
      this.recipe = data[recipes];
      console.log(this.recipe);
      if(!this.recipeArray) return;
      this.recipeArray.push(this.recipe[0]);
      });
    }
    console.log(this.recipeArray);
  }

  // randomRecipes(): any {
  //   this.apiSpoonService.getApiSpoonacular(this.idRecipe).subscribe((data)=>{
  //     this.title = data.title;
  //     this.image = data.image;
  //     this.quantityRecipesReceived
  //     console.log(this.title);
  //   });
  // }
}
