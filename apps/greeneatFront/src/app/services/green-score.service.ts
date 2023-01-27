import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GreenScoreService {

  constructor() { }

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
    return ecoScoreNumber + 33 - (ratioCo2/5 * 33) + 33 - (ratioH2o/2000 * 33);
  }

  /* function to ponderate the green score */

  ponderateGreenScore(infoFromRecipe: string[]) {

    let ponderateGreenScore: number | undefined;

    switch (infoFromRecipe[0]) {
      case('grams'):
        if (parseInt(infoFromRecipe[1]) > 100) {
          ponderateGreenScore = 1 + 0.01 * Math.pow(parseInt(infoFromRecipe[1])/100, 1.5);
        } else {
          ponderateGreenScore = 1 - 0.01 * (1 - parseInt(infoFromRecipe[1])/100);
        }
        break;
      case('kilos'):
        if (parseInt(infoFromRecipe[1]) * 1000 > 100) {
          ponderateGreenScore = 1 + 0.01 * Math.pow(parseInt(infoFromRecipe[1]) * 1000/100, 1.5);
        } else {
          ponderateGreenScore = 1 - 0.01 * (1 - parseInt(infoFromRecipe[1]) * 1000/100);
        }
        break;
      case('litres'):
        if (parseInt(infoFromRecipe[1]) * 1000 > 100) {
          ponderateGreenScore = 1 + 0.01 * Math.pow(parseInt(infoFromRecipe[1]) * 1000/100, 1.5);
        } else {
          ponderateGreenScore = 1 - 0.01 * (1 - parseInt(infoFromRecipe[1]) * 1000/100);
        }
        break;
      case('quantity'):
        break;
      case('soupSpoon'):
        if (parseInt(infoFromRecipe[1]) * 15 > 100) { /* a soup spoon weight 15g */
          ponderateGreenScore = 1 + 0.01 * Math.pow(parseInt(infoFromRecipe[1]) * 15/100, 1.5);
        } else {
          ponderateGreenScore = 1 - 0.01 * (1 - parseInt(infoFromRecipe[1]) * 15/100);
        }
        break;
      case('coffeeSpoon'):
        if (parseInt(infoFromRecipe[1]) * 5 > 100) { /* a coffee spoon weight 5g */
          ponderateGreenScore = 1 + 0.01 * Math.pow(parseInt(infoFromRecipe[1]) * 5/100, 1.5);
        } else {
          ponderateGreenScore = 1 - 0.01 * (1 - parseInt(infoFromRecipe[1]) * 5/100);
        }
        break;
      case('pincee'):
        if (parseInt(infoFromRecipe[1]) * 0.5 > 100) { /* a coffee spoon weight 0.5g */
          ponderateGreenScore = 1 + 0.01 * Math.pow(parseInt(infoFromRecipe[1]) * 0.5/100, 1.5);
        } else {
          ponderateGreenScore = 1 - 0.01 * (1 - parseInt(infoFromRecipe[1]) * 0.5/100);
        }
        break;
    }
    return ponderateGreenScore;
  }
}
