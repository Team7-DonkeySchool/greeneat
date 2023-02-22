import { Component, Input } from '@angular/core';
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
  public recipe?: string;
  public scores: number[] = [];
  public greenScore: number = 0;
  public isGreenScoreVisible: boolean = false;
  public isLoading: boolean = false;
  public ecoScore: number = 0;
  public co2Score: number = 0;
  public h2oScore: number = 0;
  public eqCo2Total: number = 0;
  public consoH2oTotal: number = 0;
  public numberPersons: number = environment.numberPersonsPerRecipe;

  constructor (private greenScoreService: GreenScoreService, private regexIngredient: RegexIngredientService, private ingredientService: IngredientsService) {
  }

  ngOnInit(): void {
    this.isGreenScoreVisible = false;
  }

  public onCalculateGreenScore(){

    this.isLoading = true;
    this.isGreenScoreVisible = false;

    let greenScore = 0;
    let ecoScore = 0;
    let co2Score = 0;
    let h2oScore = 0;
    let ecoScoreTotal = 0;
    let eqCo2Total = 0;
    let consoH2oTotal = 0;

    /* Getting each line of the request */

    if (!this.recipe) return;

    let recipesIngredient = this.recipe.split("\n");

    /* Deleting empty lines */

    let recipesIngredientFiltred: string[] = [];

    recipesIngredient.forEach((element: any)=>{
      if (element !== "") recipesIngredientFiltred.push(element); 
    });

    /* Calculating the green score with a foreach boucle on each line */

    recipesIngredientFiltred.forEach((element)=>{

      /* Filtering the recipe line with the regex service function */

      let infoFromRecipe = this.regexIngredient.getInfoFromRecipeRequestLine(element);

      /* getting datas from database for ingredients */

      this.ingredientService.getIngredientsByName(infoFromRecipe[2])
        .subscribe((data: any)=>{
          let ingredientInfosRequested = data["hydra:member"][0];

          infoFromRecipe = this.regexIngredient.getInfoFromRecipeRequestLine(element);
          
          console.log(infoFromRecipe);

          infoFromRecipe = this.greenScoreService.gramsEquivalent(infoFromRecipe, ingredientInfosRequested.weightPerUnity);
          
          /* ponderation of greenScore depending on the grams / quantity */

          ecoScoreTotal += this.greenScoreService.calculateEcoScore(ingredientInfosRequested.ecoscore);
          eqCo2Total += this.greenScoreService.calculateEqCo2Ingredient(ingredientInfosRequested.ratioCo2, parseInt(infoFromRecipe[2]));
          consoH2oTotal += this.greenScoreService.calculateConsoH2oIngredient(ingredientInfosRequested.ratioH2o, parseInt(infoFromRecipe[2]));

          ecoScore = Math.round(ecoScoreTotal / recipesIngredientFiltred.length);
          
          if(eqCo2Total < 2000) {
            co2Score = Math.round((1 - eqCo2Total / 2000) * 100);
          } else {
            co2Score = 0;
          }

          if(consoH2oTotal < 1500) {
            h2oScore = Math.round((1 - consoH2oTotal / 1500) * 100);
          } else {
            h2oScore = 0;
          }

          greenScore = Math.round((co2Score + h2oScore + ecoScore) / 3);

          this.greenScore  = greenScore;
          this.ecoScore = ecoScore;
          this.co2Score = co2Score;
          this.h2oScore = h2oScore;
          this.eqCo2Total = Math.round(eqCo2Total * 100) / 100;
          this.consoH2oTotal = Math.round(consoH2oTotal * 100) / 100;
        });
    });

    this.loadingIsTrue();

  }

  public loadingIsTrue() {
    setTimeout(() => {
      this.isLoading = false;
      this.isGreenScoreVisible = true;
    }, 2000);
  }

  onCalculateNewGreenScore() {
    this.isGreenScoreVisible = false;
  }

}
