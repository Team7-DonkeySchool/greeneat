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
  greenScoreTotal: number = 0;

  constructor (private regexIngredient: RegexIngredientService, private ingredientService: IngredientsService) {}

  ngOnInit(): void {
    
  }

  onSubmitIngredient(){
    let ponderateGreenScore = 0;
    this.greenScore = 0;
    this.greenScoreTotal = 0;

    this.recipesIngredient = this.recipe?.split("\n");

    let recipesIngredientFiltred: string[] = [];

    this.recipesIngredient?.forEach((element)=>{
      if (element !== "") recipesIngredientFiltred.push(element); 
    });

    recipesIngredientFiltred.forEach((element)=>{
      
      this.infoFromRecipe = this.regexIngredient.getInfoFromRecipeRequestLine(element);

      /* ponderation of greenScore depending on the grams / quantity */

      if (!this.infoFromRecipe) return;
      switch (this.infoFromRecipe[0]) {
        case('grams'):
          if (parseInt(this.infoFromRecipe[1])>100) {
            ponderateGreenScore = 1 + 0.01 * Math.exp(parseInt(this.infoFromRecipe[1])/100);
          } else {
            ponderateGreenScore = 1 - 0.01 * (1 - parseInt(this.infoFromRecipe[1])/100);
          }
          break;
        case('quantity'):
          break;
        case('soupSpoon'):
          if (parseInt(this.infoFromRecipe[1]) * 15 >100) { /* a soup spoon weight 15g */
            ponderateGreenScore = 1 + 0.01 * parseInt(this.infoFromRecipe[1]) * 15/100;
          } else {
            ponderateGreenScore = 1 - 0.01 * (1 - parseInt(this.infoFromRecipe[1]) * 15/100);
          }
          break;
        case('coffeeSpoon'):
          if (parseInt(this.infoFromRecipe[1]) * 5 >100) { /* a coffee spoon weight 5g */
            ponderateGreenScore = 1 + 0.01 * parseInt(this.infoFromRecipe[1]) * 5/100;
          } else {
            ponderateGreenScore = 1 - 0.01 * (1 - parseInt(this.infoFromRecipe[1]) * 5/100);
          }
          break;
        case('pincee'):
          if (parseInt(this.infoFromRecipe[1]) * 0.5 >100) { /* a coffee spoon weight 0.5g */
            ponderateGreenScore = 1 + 0.01 * parseInt(this.infoFromRecipe[1]) * 0.5/100;
          } else {
            ponderateGreenScore = 1 - 0.01 * (1 - parseInt(this.infoFromRecipe[1]) * 0.5/100);
          }
          break;
      }

      this.ingredientService.getIngredientsByName(this.infoFromRecipe[2])
        .subscribe((data: any)=>{
          this.ingredientInfosRequested = data["hydra:member"][0];
          console.log('ingredients', this.ingredientInfosRequested);
          this.greenScoreTotal += this.calculateGreenScore(this.ingredientInfosRequested.ecoscore, this.ingredientInfosRequested.ratioCo2, this.ingredientInfosRequested.ratioH2o) / ponderateGreenScore;
          this.greenScore = this.greenScoreTotal / recipesIngredientFiltred.length;
          console.log('green score', this.greenScore);
          console.log('green score total', this.greenScoreTotal);
          console.log('number of ingredients', recipesIngredientFiltred.length);
        });
    });
    this.greenScoreTotal = 0;

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
