import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IngredientsService } from './ingredients.service';
import { RegexIngredientService } from './regex-ingredient.service';

@Injectable({
  providedIn: 'root'
})
export class GreenScoreService {

  private eqKgCo2Max: number = environment.eqCo2Max;
  private consoH2oMax: number = environment.consoH2oMax;
  private numberPersons: number = environment.numberPersonsPerRecipe;

  public scores: number[] = [];

  constructor(private regexIngredient: RegexIngredientService, private ingredientService: IngredientsService) { }

  /* functions to calculate the green score */

  public calculateGreenScore(recipe: string) {
    let greenScore = 0;
    let ecoScore = 0;
    let co2Score = 0;
    let h2oScore = 0;
    let ecoScoreTotal = 0;
    let co2ScoreTotal = 0;
    let h2oScoreTotal = 0;
    let eqCo2Total = 0;
    let consoH2oTotal = 0;

    /* Getting each line of the request */

    let recipesIngredient = recipe.split("\n");

    /* Deleting empty lines */

    let recipesIngredientFiltred: string[] = [];

    recipesIngredient.forEach((element: any)=>{
      if (element !== "") recipesIngredientFiltred.push(element); 
    });

    /* Calculating the green score with a foreach boucle on each line */

    recipesIngredientFiltred.forEach((element)=>{

      let ponderateGreenScoreByElement: number | undefined;
      ponderateGreenScoreByElement = 0;

      /* Filtering the recipe line with the regex service function */

      let infoFromRecipe = this.regexIngredient.getInfoFromRecipeRequestLine(element);

      /* getting datas from database for ingredients */

      this.ingredientService.getIngredientsByName(infoFromRecipe[2])
        .subscribe((data: any)=>{
          let ingredientInfosRequested = data["hydra:member"][0];

          infoFromRecipe = this.regexIngredient.getInfoFromRecipeRequestLine(element);
          
          console.log(infoFromRecipe);

          infoFromRecipe = this.gramsEquivalent(infoFromRecipe, ingredientInfosRequested.weightPerUnity);
          
          /* ponderation of greenScore depending on the grams / quantity */

          ecoScoreTotal += this.calculateEcoScore(ingredientInfosRequested.ecoscore);
          eqCo2Total += this.calculateEqCo2Ingredient(ingredientInfosRequested.ratioCo2, parseInt(infoFromRecipe[2]));
          consoH2oTotal += this.calculateConsoH2oIngredient(ingredientInfosRequested.ratioH2o, parseInt(infoFromRecipe[2]));

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

          this.scores[0] = greenScore;
          this.scores[1] = ecoScore;
          this.scores[2] = co2Score;
          this.scores[3] = h2oScore;
          this.scores[4] = eqCo2Total;
          this.scores[5] = consoH2oTotal;

          console.log(this.scores);

        });
    });

  }

  public calculateEcoScore(ecoscore: string) {
    let ecoScoreNumber: number = 0;
    switch (ecoscore) {
      case('A'):
        ecoScoreNumber = 100;
        break;
      case('B'):
        ecoScoreNumber = 80;
        break;
      case('C'):
        ecoScoreNumber = 60;
        break;
      case('D'):
        ecoScoreNumber = 40;
        break;
      case('E'):
        ecoScoreNumber = 20;
        break;
    }

    return ecoScoreNumber;
  }

  public calculateCo2Score(ratioCo2: number) {

    return 100 - (ratioCo2 / this.eqKgCo2Max * 100);
  }

  public calculateH2oScore(ratioH2o: number) {

    return 100 - (ratioH2o / this.consoH2oMax * 100);
  }

  public calculateEqCo2Ingredient(ratioCo2: number, weight: number) {

    return ratioCo2 * weight * 10 / this.numberPersons;
  }

  public calculateConsoH2oIngredient(ratioH2o: number, weight: number) {

    return ratioH2o * weight / 100 / this.numberPersons;
  }

  /* function to ponderate the green score */

  public calculatePonderation(infoFromRecipe: string[], coeff: number) {
    
    let ponderateGreenScore: number | undefined;

    if (parseInt(infoFromRecipe[2]) * coeff > 100) {
      ponderateGreenScore = 1 + 0.005 * Math.pow(parseInt(infoFromRecipe[2])/100, 1.1);
    } else {
      ponderateGreenScore = 1 - 0.01 * (1 - parseInt(infoFromRecipe[2])/100);
    }

    return ponderateGreenScore;
  }

  public ponderateGreenScore(infoFromRecipe: string[]) {

    let ponderateGreenScore: number | undefined;

    switch (infoFromRecipe[0]) {
      case('grams'):
        ponderateGreenScore = this.calculatePonderation(infoFromRecipe, 1);
        break;
      case('quantity'):
        ponderateGreenScore = this.calculatePonderation(infoFromRecipe, 1);
        break;
      case('kilos'):
        ponderateGreenScore = this.calculatePonderation(infoFromRecipe, 1000); /* a kilo weights 1000g */
        break;
      case('litres'):
        ponderateGreenScore = this.calculatePonderation(infoFromRecipe, 1000); /* a litre weights 1000g */
        break;
      case('decilitres'):
        ponderateGreenScore = this.calculatePonderation(infoFromRecipe, 100); /* a decilitre weights 100g */
        break;
      case('centilitres'):
        ponderateGreenScore = this.calculatePonderation(infoFromRecipe, 10); /* a centilitre weights 10g */
        break;
      case('millilitres'):
        ponderateGreenScore = this.calculatePonderation(infoFromRecipe, 1); /* a millilitre weights 1g */
        break;
      case('soupSpoon'):
        ponderateGreenScore = this.calculatePonderation(infoFromRecipe, 15); /* a soup spoon weights 15g */
        break;
      case('coffeeSpoon'):
        ponderateGreenScore = this.calculatePonderation(infoFromRecipe, 5); /* a coffee spoon weights 5g */
        break;
      case('pincee'):
        ponderateGreenScore = this.calculatePonderation(infoFromRecipe, 0.5); /* a pinch weights 0.5g */
        break;
    }

    return ponderateGreenScore;

  }

  /* Calculate equivament gramms" */

  public replacesQuantityWithGrams(infoFromRecipe: any[], gramsElement: number) {
    let weightToInsert = 0;
    weightToInsert = gramsElement * parseInt(infoFromRecipe[1]);
    infoFromRecipe.splice(2, 0, weightToInsert);
  }

  public gramsEquivalent(infoFromRecipe: string[], weightPerUnity: number) {

    switch (infoFromRecipe[0]) {
      case('grams'):
        this.replacesQuantityWithGrams(infoFromRecipe, 1);
        break;
      case('quantity'):
        this.replacesQuantityWithGrams(infoFromRecipe, weightPerUnity);
        break;
      case('kilos'):
        this.replacesQuantityWithGrams(infoFromRecipe, 1000);
        break;
      case('litres'):
        this.replacesQuantityWithGrams(infoFromRecipe, 1000);
        break;
      case('decilitres'):
        this.replacesQuantityWithGrams(infoFromRecipe, 100);
        break;
      case('centilitres'):
        this.replacesQuantityWithGrams(infoFromRecipe, 10);
        break;
      case('millilitres'):
        this.replacesQuantityWithGrams(infoFromRecipe, 1);
        break;
      case('soupSpoon'):
        this.replacesQuantityWithGrams(infoFromRecipe, 15);
        break;
      case('coffeeSpoon'):
        this.replacesQuantityWithGrams(infoFromRecipe, 5);
        break;
      case('pincee'):
        this.replacesQuantityWithGrams(infoFromRecipe, 0.5);
        break;
      }

    return infoFromRecipe;
  }
}
