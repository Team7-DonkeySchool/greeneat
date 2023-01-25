import { Component, OnInit } from '@angular/core';
import { interval, map, mergeMap, of } from 'rxjs';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { RegexIngredientService } from 'src/app/services/regex-ingredient.service';

@Component({
  selector: 'app-input-ingredient',
  templateUrl: './input-ingredient.component.html',
  styleUrls: ['./input-ingredient.component.scss']
})
export class InputIngredientComponent implements OnInit {

  recipesIngredient?: string[];
  recipe?: string;
  infoFromRecipe?: string[];
  ingredientInfosRequested?: any;
  greenScore?: number;

  constructor (private regexIngredient: RegexIngredientService, private ingredientService: IngredientsService) {}

  ngOnInit(): void {
    
  }

  onSubmitIngredient(){
    let greenScoreTotal = 0;

    this.recipesIngredient = this.recipe?.split("\n");

    this.recipesIngredient?.forEach((element)=>{
      this.infoFromRecipe = this.regexIngredient.getInfoFromRecipeRequestLine(element);

      this.ingredientService.getIngredientsByName(this.infoFromRecipe[2])
        .pipe(
          mergeMap((data: any)=>{
            this.ingredientInfosRequested = data["hydra:member"][0];
            return of(this.calculateGreenScore(this.ingredientInfosRequested.ecoscore, this.ingredientInfosRequested.ratioCo2, this.ingredientInfosRequested.ratioH2o))
              .pipe(map(data => greenScoreTotal += data));
          })
        )
        .subscribe((data: any)=>{
          greenScoreTotal = data;
          console.log(greenScoreTotal);

          if (!this.recipesIngredient) return;
          this.greenScore = greenScoreTotal / this.recipesIngredient.length;
        });
    });
  }

  /* function to calculate the green score */

  calculateGreenScore(ecoscore: string, ratioCo2: number, ratioH2o: number) {
    let ecoScoreNumber = 0;
    switch (ecoscore) {
      case('A'):
        ecoScoreNumber = 34;
        break;
      case('B'):
        ecoScoreNumber = 28;
        break;
      case('C'):
        ecoScoreNumber = 21;
        break;
      case('D'):
        ecoScoreNumber = 14;
        break;
      case('E'):
        ecoScoreNumber = 7;
        break;
    }
    return ecoScoreNumber + 33 - (ratioCo2/0.8 * 33) + 33 - (ratioH2o/2000 * 33);
  }
}
