import { Component } from '@angular/core';
import { ApiSpoonacularService } from 'src/app/services/api-spoonacular.service';
import { Recipe, RecipeSpoonacular } from 'src/app/typings';
import { mergeMap, switchMap, tap, of } from 'rxjs';

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
  public recipeToPost?: RecipeSpoonacular;

  constructor(private apiSpoonService: ApiSpoonacularService) {
  }

  ngOnInit(): void {
    this.recipeArray = [];
    for(let i = 0; i < 2; i++) {
    this.apiSpoonService.getApiSpoonacularRandom()
      .pipe(
        mergeMap(
          (data: any) => {
            console.log(data);
            this.recipe = data.recipes;
            if(!this.recipe) return of();
            this.recipeArray?.push(this.recipe[0]);
            
            // this.recipeToPost.name = this.recipe[0].title;
            // this.recipeToPost.ingredients = {....};

            return this.apiSpoonService.postApiSpoonacularData(data);
          }
        )
      )
      .subscribe((data: any) => {
        // console.log(data);
      })
    }
  }
}
