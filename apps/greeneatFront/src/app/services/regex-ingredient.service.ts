import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexIngredientService {

  /*  english regex  */
  private regExpSpoonEN: RegExp = /[s][p][o][o][n][s]?/g
  private regExpCoffeeEN: RegExp = /[c][o][f][f][e]?[e]?[s]?/g;
  private regExpOf: RegExp = /[o][f]/g;

  private regExpGrams: RegExp = /\d+[g][r]?[a]?[m]?[m]?[e]?[s]?/g;
  private regExpGramWord: RegExp = /^[g][r]?[a]?[m]?[m]?[e]?[s]?/g;
  private regExpPincee: RegExp = /[p][i][n][c][h]?[é]?[è]?[e]?[e]?[s]?/g;
  private regExpSpoon: RegExp = /[c][u][i][l][l][e]?[è]?[é]?[r][e]?[e]?[s]?/g;
  private regExpSoup: RegExp = /[s][o][u][p][e]?/g;
  private regExpCoffee: RegExp = /[c][a][f][f]?[e]?[é]?[è]?/g;
  private regExpSoupSpoon: RegExp = /[c][u][i][l][l][e]?[è]?[é]?[r][e]?[e]?[s]?\s*[a]?[à]?\s*[s][o]?[u]?[p]?[e]?|càs|cas/g;
  private regExpCoffeeSpoon: RegExp = /[c][u][i][l][l][[e]?[è]?[é]?[r][e]?[e]?[s]?\s*[a]?[à]?\s*[c][a]?[f]?[f]?[e]?[é]?[è]?|càc|cac/g;
  private regExpQuantity: RegExp = /\d+\s*/g;
  private regExpDe: RegExp = /[d][e]/g;
  private regExpD1: RegExp = /[d][']?\s+/g;
  private regExpD2: RegExp = /[d][']?\s*\w*/g;
  private regExpD2Rest: RegExp = /(?![d]['])\w*/g;  /* regex excluding "d'". For example in "d'oeuf", we only keep "oeuf" */
  private regExpKilos: RegExp = /\d+[k][g]?[i]?[l]?[o]?[g]?[r]?[a]?[m]?[e]?[s]?/g;
  private regExpKiloWord: RegExp = /[k][g]?[i]?[l]?[o]?[g]?[r]?[a]?[m]?[e]?[s]?/g;
  private regExpLitres: RegExp = /\d+[l]|[l][i][t][r][e]?[s]?/g;
  private regExpLitreWord: RegExp = /[l]|[l][i][t][r][e]?[s]?/g;
  private regExpCentiLitres: RegExp = /\d+[c][l]/g;
  private regExpCentiLitresWord: RegExp = /[c][l]/g;
  private regExpDeciLitres: RegExp = /\d+[d][l]/g;
  private regExpDeciLitresWord: RegExp = /[d][l]/g;

  constructor() { }

  /* verifying if it is followed by "de", "d'" */

  public pushInfoIntoInfoFromRecipeWithDeOrD(recipeArray: any, infoFromRecipe: any[], element: any, index: number, place: number) {
    if (!element || !recipeArray) return;
    if (recipeArray[index + place].match(this.regExpDe)) { 
      infoFromRecipe.push(element.match(this.regExpQuantity)) && infoFromRecipe.push(this.getEndOfArrayAsSentence(recipeArray, index + place + 1));
    } else if (recipeArray[index + place].match(this.regExpD1)) {
      infoFromRecipe.push(element.match(this.regExpQuantity)) && infoFromRecipe.push(this.getEndOfArrayAsSentence(recipeArray, index + place + 1));
    } else if (recipeArray[index + place].match(this.regExpD2)) {
      infoFromRecipe.push(element.match(this.regExpQuantity)) && infoFromRecipe.push(this.getEndOfArrayAsSentence(recipeArray, index + place).match(this.regExpD2Rest)[1]);
    } else {
      infoFromRecipe.push(element.match(this.regExpQuantity)) && infoFromRecipe.push(this.getEndOfArrayAsSentence(recipeArray, index + place));
    }
  }

  /* get the ingredients composed of several words such as "sucre de canne" */

  public getEndOfArrayAsSentence(array: string[], place: number): any {
    let array2 = [];
    for (let i = place; i < array.length; i++) {
      array2.push(array[i]);
    }
    return array2.join(' ');
  }
    
  /* applying regex to the recipe line to get infos" */

  public getInfoFromRecipeRequestLine(recipeLine: any) {
    
    let recipeArrayTotal = recipeLine.split(" ");
    let recipeArray: string[] = [];

    recipeArrayTotal.forEach((element: any)=>{     /* filters spaces in the sentence */
        if (element !== "") recipeArray.push(element);
    });
    
    let infoFromRecipe: string[] = [];

    recipeArray.forEach((element: any, index: number) => {

        if (element.match(this.regExpGrams)) {
          infoFromRecipe[0] = 'grams'; /* the first key of the array is the type of info */
          this.pushInfoIntoInfoFromRecipeWithDeOrD(recipeArray, infoFromRecipe, element, index, 1);
    
        } else if (element.match(this.regExpKilos)) {
          infoFromRecipe[0] = 'kilos'; 
          this.pushInfoIntoInfoFromRecipeWithDeOrD(recipeArray, infoFromRecipe, element, index, 1);

        } else if (element.match(this.regExpLitres)) {
          infoFromRecipe[0] = 'litres'; 
          this.pushInfoIntoInfoFromRecipeWithDeOrD(recipeArray, infoFromRecipe, element, index, 1);
        
        } else if (element.match(this.regExpDeciLitres)) {
          infoFromRecipe[0] = 'decilitres'; 
          this.pushInfoIntoInfoFromRecipeWithDeOrD(recipeArray, infoFromRecipe, element, index, 1);

        } else if (element.match(this.regExpCentiLitres)) {
          infoFromRecipe[0] = 'centilitres'; 
          this.pushInfoIntoInfoFromRecipeWithDeOrD(recipeArray, infoFromRecipe, element, index, 1);

        } else if (element.match(this.regExpQuantity)) {

          if (recipeArray[index + 1].match(this.regExpGramWord)) {
            infoFromRecipe[0] = 'grams';
            this.pushInfoIntoInfoFromRecipeWithDeOrD(recipeArray, infoFromRecipe, element, index, 2);

          } else if (recipeArray[index + 1].match(this.regExpKiloWord)) {
            infoFromRecipe[0] = 'kilos';
            this.pushInfoIntoInfoFromRecipeWithDeOrD(recipeArray, infoFromRecipe, element, index, 2);

          } else if (recipeArray[index + 1].match(this.regExpLitreWord)) {
            infoFromRecipe[0] = 'litres';
            this.pushInfoIntoInfoFromRecipeWithDeOrD(recipeArray, infoFromRecipe, element, index, 2);

          } else if (recipeArray[index + 1].match(this.regExpDeciLitresWord)) {
            infoFromRecipe[0] = 'decilitres';
            this.pushInfoIntoInfoFromRecipeWithDeOrD(recipeArray, infoFromRecipe, element, index, 2);

          } else if (recipeArray[index + 1].match(this.regExpCentiLitresWord)) {
            infoFromRecipe[0] = 'centilitres';
            this.pushInfoIntoInfoFromRecipeWithDeOrD(recipeArray, infoFromRecipe, element, index, 2);

          } else if (recipeArray[index + 1].match(this.regExpSpoon)) {

              if (recipeArray[index + 3].match(this.regExpSoup)) {
                  infoFromRecipe[0] = 'soupSpoon';
                  this.pushInfoIntoInfoFromRecipeWithDeOrD(recipeArray, infoFromRecipe, element, index, 4);

              } else if (recipeArray[index + 3].match(this.regExpCoffee)) {
                  infoFromRecipe[0] = 'coffeeSpoon';
                  this.pushInfoIntoInfoFromRecipeWithDeOrD(recipeArray, infoFromRecipe, element, index, 4);

              }
          } else if (recipeArray[index + 1].match(this.regExpSoupSpoon)) {
              infoFromRecipe[0] = 'soupSpoon';
              this.pushInfoIntoInfoFromRecipeWithDeOrD(recipeArray, infoFromRecipe, element, index, 2);

          }  else if (recipeArray[index + 1].match(this.regExpCoffeeSpoon)) {
              infoFromRecipe[0] = 'coffeeSpoon';
              this.pushInfoIntoInfoFromRecipeWithDeOrD(recipeArray, infoFromRecipe, element, index, 2);
  
          } else if (recipeArray[index + 1].match(this.regExpPincee)) {
              infoFromRecipe[0] = 'pincee';
              this.pushInfoIntoInfoFromRecipeWithDeOrD(recipeArray, infoFromRecipe, element, index, 2);
  
          } else {
              infoFromRecipe[0] = 'quantity';
              infoFromRecipe.push(element.match(this.regExpQuantity))  && infoFromRecipe.push(this.getEndOfArrayAsSentence(recipeArray, index + 1));
          } 
        };
    });

    return infoFromRecipe;
  }
}
