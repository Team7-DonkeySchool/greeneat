import { Component } from '@angular/core';
import { ApiSpoonacularService } from 'src/app/services/api-spoonacular.service';
import { Recipe } from 'src/app/typings';

@Component({
  selector: 'app-seasonal-recipes',
  templateUrl: './seasonal-recipes.component.html',
  styleUrls: ['./seasonal-recipes.component.scss']
})
export class SeasonalRecipesComponent {

  public title?: string;
  public image?: string;
  public searchInput: string = '';
  public idRecipe: number = 0;
  public titleResult?: string;
  public imageResult?: string;
  public recipe?: Recipe[];
  public ingredients?: any;
  public recipeArray? : Recipe[];

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
