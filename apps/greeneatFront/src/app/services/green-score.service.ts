import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GreenScoreService {

  private eqKgCo2Max: number = 5;
  private consoH2oMax: number = 2000;

  constructor() { }

  /* function to calculate the green score */

  public calculateGreenScore(ecoscore: string, ratioCo2: number, ratioH2o: number) {

    return (this.calculateEcoScore(ecoscore) + this.calculateCo2Score(ratioCo2) + this.calculateH2oScore(ratioH2o)) / 3;
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

  /* function to ponderate the green score */

  public ponderateGreenScore(infoFromRecipe: string[]) {

    let ponderateGreenScore: number | undefined;

    switch (infoFromRecipe[0]) {
      case('grams'):
        if (parseInt(infoFromRecipe[1]) > 100) {
          ponderateGreenScore = 1 + 0.005 * Math.pow(parseInt(infoFromRecipe[1])/100, 1.1);
        } else {
          ponderateGreenScore = 1 - 0.01 * (1 - parseInt(infoFromRecipe[1])/100);
        }
        break;
      case('quantity'):
        if (parseInt(infoFromRecipe[2]) > 100) {
          ponderateGreenScore = 1 + 0.005 * Math.pow(parseInt(infoFromRecipe[2])/100, 1.1);
        } else {
          ponderateGreenScore = 1 - 0.01 * (1 - parseInt(infoFromRecipe[2])/100);
        }
        break;
      case('kilos'):
        if (parseInt(infoFromRecipe[1]) * 1000 > 100) {
          ponderateGreenScore = 1 + 0.005 * Math.pow(parseInt(infoFromRecipe[1]) * 1000/100, 1.1);
        } else {
          ponderateGreenScore = 1 - 0.01 * (1 - parseInt(infoFromRecipe[1]) * 1000/100);
        }
        break;
      case('litres'):
        if (parseInt(infoFromRecipe[1]) * 1000 > 100) {
          ponderateGreenScore = 1 + 0.005 * Math.pow(parseInt(infoFromRecipe[1]) * 1000/100, 1.1);
        } else {
          ponderateGreenScore = 1 - 0.01 * (1 - parseInt(infoFromRecipe[1]) * 1000/100);
        }
        break;
      case('soupSpoon'):
        if (parseInt(infoFromRecipe[1]) * 15 > 100) { /* a soup spoon weights 15g */
          ponderateGreenScore = 1 + 0.005 * Math.pow(parseInt(infoFromRecipe[1]) * 15/100, 1.1);
        } else {
          ponderateGreenScore = 1 - 0.01 * (1 - parseInt(infoFromRecipe[1]) * 15/100);
        }
        break;
      case('coffeeSpoon'):
        if (parseInt(infoFromRecipe[1]) * 5 > 100) { /* a coffee spoon weights 5g */
          ponderateGreenScore = 1 + 0.005 * Math.pow(parseInt(infoFromRecipe[1]) * 5/100, 1.1);
        } else {
          ponderateGreenScore = 1 - 0.01 * (1 - parseInt(infoFromRecipe[1]) * 5/100);
        }
        break;
      case('pincee'):
        if (parseInt(infoFromRecipe[1]) * 0.5 > 100) { /* a coffee spoon weights 0.5g */
          ponderateGreenScore = 1 + 0.005 * Math.pow(parseInt(infoFromRecipe[1]) * 0.5/100, 1.2);
        } else {
          ponderateGreenScore = 1 - 0.01 * (1 - parseInt(infoFromRecipe[1]) * 0.5/100);
        }
        break;
    }
    return ponderateGreenScore;
  }

  /* Case infoFromRecipe[0] === "quantity" */

  public quantityOrMetrics(infoFromRecipe: string[], weightPerUnity: number) {
    if (infoFromRecipe[0] === 'quantity') {
      let weightToInsert = 0;
      weightToInsert = weightPerUnity * parseInt(infoFromRecipe[1]);
      infoFromRecipe.splice(2, 0, weightToInsert.toString());
    }

    return infoFromRecipe;
  }
}
