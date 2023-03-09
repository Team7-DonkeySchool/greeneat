import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
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

  constructor(private regexIngredient: RegexIngredientService, private ingredientService: IngredientsService) {}

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
