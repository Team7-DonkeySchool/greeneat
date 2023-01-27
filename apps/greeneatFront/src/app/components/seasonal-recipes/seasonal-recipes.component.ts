import { Component } from '@angular/core';
import { ApiSpoonacularService } from 'src/app/services/api-spoonacular.service';
import { Recipe } from 'src/app/typings';

@Component({
  selector: 'app-seasonal-recipes',
  templateUrl: './seasonal-recipes.component.html',
  styleUrls: ['./seasonal-recipes.component.scss']
})
export class SeasonalRecipesComponent {

  title?: string;
  image?: string;
  searchInput = '';
  idRecipe = 0;
  titleResult?: string;
  imageResult?: string;
  recipe?: Recipe[];
  ingredients?: any;
  recipeArray? : Recipe[];

  constructor(private apiSpoonService: ApiSpoonacularService) {
  }

  ngOnInit(): void {
    this.recipeArray = [];
    for(let i = 0; i < 2; i++) {
    this.apiSpoonService.getApiSpoonacularRandom().subscribe((data)=>{
      this.recipe = data.recipes;

      if(!this.recipeArray) return;
      this.recipeArray.push(this.recipe[0]);
      });
    }
  }
}
