import { Component } from '@angular/core';
import { mergeMap, of } from 'rxjs';
import { GreenScoreService } from 'src/app/services/green-score.service';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { RegexIngredientService } from 'src/app/services/regex-ingredient.service';

@Component({
    selector: 'app-input-ingredients',
    templateUrl: './input-ingredients.component.html',
    styleUrls: ['./input-ingredients.component.scss']
})
export class InputIngredientsComponent {
  recipesIngredient?: string[];
  recipe?: string;
  infoFromRecipe?: any;
  ingredientInfosRequested?: any;
  greenScore?: number;
  greenScoreTotal: number = 0;
  isGreenScoreVisible = false;

  constructor (private greenScoreService: GreenScoreService, private regexIngredient: RegexIngredientService, private ingredientService: IngredientsService) {}

  ngOnInit(): void {
    this.isGreenScoreVisible = false;
  }

  onCalculateGreeScore(){
    this.greenScore = 0;
    this.greenScoreTotal = 0;

    /* Getting each line of the request */

    this.recipesIngredient = this.recipe?.split("\n");

    /* Deleting empty lines */

    let recipesIngredientFiltred: string[] = [];

    this.recipesIngredient?.forEach((element)=>{
      if (element !== "") recipesIngredientFiltred.push(element); 
    });

    /* Calculating the green score with a foreach boucle on each line */

    recipesIngredientFiltred.forEach((element)=>{

      let ponderateGreenScoreByElement: number | undefined;
      ponderateGreenScoreByElement = 0;

      /* Filtering the recipe line with the regex service function */

      this.infoFromRecipe = this.regexIngredient.getInfoFromRecipeRequestLine(element);

      /* creating an observable returning the name of the ingredient to deal with asynchronism of get function */

      const nameOfIngredient$ = of(this.infoFromRecipe[2]);

      /* getting datas from database for ingredients */

      nameOfIngredient$
        .pipe(
          mergeMap(ingredient => this.ingredientService.getIngredientsByName(ingredient))
        )
        .subscribe((data: any)=>{
          this.ingredientInfosRequested = data["hydra:member"][0];

          /* ponderation of greenScore depending on the grams / quantity */

          this.infoFromRecipe = this.greenScoreService.quantityOrMetrics(this.infoFromRecipe, this.ingredientInfosRequested.weightPerUnity);
          
          ponderateGreenScoreByElement = this.greenScoreService.ponderateGreenScore(this.infoFromRecipe);
          console.log(ponderateGreenScoreByElement);

          if(!ponderateGreenScoreByElement) return;
          this.greenScoreTotal += this.greenScoreService.calculateGreenScore(this.ingredientInfosRequested.ecoscore, this.ingredientInfosRequested.ratioCo2, this.ingredientInfosRequested.ratioH2o) / ponderateGreenScoreByElement;
          this.greenScore = Math.round((this.greenScoreTotal / recipesIngredientFiltred.length));
        });
    });
    this.isGreenScoreVisible = true;
  }
}
