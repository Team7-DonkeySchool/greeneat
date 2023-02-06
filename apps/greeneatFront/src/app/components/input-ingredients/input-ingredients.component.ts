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
  public recipesIngredient?: string[];
  public recipe?: string;
  public infoFromRecipe?: any;
  public ingredientInfosRequested?: any;
  public greenScore?: number;
  public greenScoreTotal: number = 0;
  public isGreenScoreVisible: boolean = false;
  public ecoScore?: number;
  public co2Score?: number;
  public h2oScore?: number;
  public ecoScoreTotal: number = 0;
  public co2ScoreTotal: number = 0;
  public h2oScoreTotal: number = 0;

  constructor (private greenScoreService: GreenScoreService, private regexIngredient: RegexIngredientService, private ingredientService: IngredientsService) {}

  ngOnInit(): void {
    this.isGreenScoreVisible = false;
  }

  public onCalculateGreeScore(){
    this.greenScore = 0;
    this.greenScoreTotal = 0;
    this.ecoScoreTotal = 0;
    this.co2ScoreTotal = 0;
    this.h2oScoreTotal = 0;

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

          if(!ponderateGreenScoreByElement) return;
          this.greenScoreTotal += this.greenScoreService.calculateGreenScore(this.ingredientInfosRequested.ecoscore, this.ingredientInfosRequested.ratioCo2, this.ingredientInfosRequested.ratioH2o) / ponderateGreenScoreByElement;
          this.ecoScoreTotal += this.greenScoreService.calculateEcoScore(this.ingredientInfosRequested.ecoscore) / ponderateGreenScoreByElement;
          this.co2ScoreTotal += this.greenScoreService.calculateCo2Score(this.ingredientInfosRequested.ratioCo2) / ponderateGreenScoreByElement;
          this.h2oScoreTotal += this.greenScoreService.calculateH2oScore(this.ingredientInfosRequested.ratioH2o) / ponderateGreenScoreByElement;

          this.greenScore = Math.round((this.greenScoreTotal / recipesIngredientFiltred.length));
          this.ecoScore = Math.round((this.ecoScoreTotal / recipesIngredientFiltred.length));
          this.co2Score = Math.round((this.co2ScoreTotal / recipesIngredientFiltred.length));
          this.h2oScore = Math.round((this.h2oScoreTotal / recipesIngredientFiltred.length));

        });
    });

    this.isGreenScoreVisible = true;
  }
}
