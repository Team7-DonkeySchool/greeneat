import { Component } from '@angular/core';
import { concatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { GreenScoreService } from 'src/app/services/green-score.service';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { RegexIngredientService } from 'src/app/services/regex-ingredient.service';
import { environment } from 'src/environments/environment';

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
  public greenScore: number = 0;
  public greenScoreTotal: number = 0;
  public isGreenScoreVisible: boolean = false;
  public ecoScore: number = 0;
  public co2Score: number = 0;
  public h2oScore: number = 0;
  public ecoScoreTotal: number = 0;
  public co2ScoreTotal: number = 0;
  public h2oScoreTotal: number = 0;
  public eqCo2: number = 0;
  public consoH2o: number = 0;
  public eqCo2Total: number = 0;
  public consoH2oTotal: number = 0;
  public numberPersons: number = environment.numberPersonsPerRecipe;

  constructor (private greenScoreService: GreenScoreService, private regexIngredient: RegexIngredientService, private ingredientService: IngredientsService) {
  }

  ngOnInit(): void {
    this.isGreenScoreVisible = false;
  }

  public onCalculateGreeScore(){
    this.greenScore = 0;
    this.greenScoreTotal = 0;
    this.ecoScoreTotal = 0;
    this.co2ScoreTotal = 0;
    this.h2oScoreTotal = 0;
    this.eqCo2Total = 0;
    this.consoH2oTotal = 0;

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

      /* getting datas from database for ingredients */

      this.ingredientService.getIngredientsByName(this.infoFromRecipe[2])
        .subscribe((data: any)=>{
          this.ingredientInfosRequested = data["hydra:member"][0];

          this.infoFromRecipe = this.regexIngredient.getInfoFromRecipeRequestLine(element);
          
          console.log(this.infoFromRecipe);

          this.infoFromRecipe = this.greenScoreService.gramsEquivalent(this.infoFromRecipe, this.ingredientInfosRequested.weightPerUnity);
          
          console.log(this.infoFromRecipe, this.ingredientInfosRequested.weightPerUnity);

          /* ponderation of greenScore depending on the grams / quantity */

          ponderateGreenScoreByElement = this.greenScoreService.ponderateGreenScore(this.infoFromRecipe);

          if(!ponderateGreenScoreByElement) return;
          this.greenScoreTotal += this.greenScoreService.calculateGreenScore(this.ingredientInfosRequested.ecoscore, this.ingredientInfosRequested.ratioCo2, this.ingredientInfosRequested.ratioH2o) / ponderateGreenScoreByElement;
          this.ecoScoreTotal += this.greenScoreService.calculateEcoScore(this.ingredientInfosRequested.ecoscore);
          this.co2ScoreTotal += this.greenScoreService.calculateCo2Score(this.ingredientInfosRequested.ratioCo2) / ponderateGreenScoreByElement;
          this.h2oScoreTotal += this.greenScoreService.calculateH2oScore(this.ingredientInfosRequested.ratioH2o) / ponderateGreenScoreByElement;
          this.eqCo2Total += this.greenScoreService.calculateEqCo2Ingredient(this.ingredientInfosRequested.ratioCo2, this.infoFromRecipe[2]);
          this.consoH2oTotal += this.greenScoreService.calculateConsoH2oIngredient(this.ingredientInfosRequested.ratioH2o, this.infoFromRecipe[2]);

          this.greenScore = Math.round(this.greenScoreTotal / recipesIngredientFiltred.length);
          this.ecoScore = Math.round(this.ecoScoreTotal / recipesIngredientFiltred.length);
          this.co2Score = Math.round(this.co2ScoreTotal / recipesIngredientFiltred.length);
          this.h2oScore = Math.round(this.h2oScoreTotal / recipesIngredientFiltred.length);
          
          if(this.eqCo2Total < 2000) {
            this.co2Score = Math.round((1 - this.eqCo2Total / 2000) * 100);
          } else {
            this.co2Score = 0;
          }

          if(this.consoH2oTotal < 1500) {
            this.h2oScore = Math.round((1 - this.consoH2oTotal / 1500) * 100);
          } else {
            this.h2oScore = 0;
          }

          this.greenScore = Math.round((this.co2Score + this.h2oScore + this.ecoScore) / 3);
        });
    });

    this.isGreenScoreVisible = true;
  }
}
