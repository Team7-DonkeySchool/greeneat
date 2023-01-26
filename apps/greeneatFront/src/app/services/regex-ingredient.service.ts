import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexIngredientService {

  regExpGrams = /\d+[g][r]?[a]?[m]?[m]?[e]?[s]?/g;
  regExpGramWord = /^[g][r]?[a]?[m]?[m]?[e]?[s]?/g;
  regExpPincee = /pinc[é]?[è]?[e]?[e]?[s]?/g;
  regExpSpoon = /cuill[e]?[è]?[é]?[r][e]?[e]?[s]?/g;
  regExpSoup = /soup[e]?/g;
  regExpCoffee = /caf[f]?[e]?[é]?[è]?/g;
  regExpSoupSpoon = /cuill[[e]?[è]?[é]?[r][e]?[e]?[s]?\s*[a]?[à]?\s*[s][o]?[u]?[p]?[e]?|càs|cas/g;
  regExpCoffeeSpoon = /cuill[[e]?[è]?[é]?[r][e]?[e]?[s]?\s*[a]?[à]?\s*[c][a]?[f]?[f]?[e]?[é]?[è]?|càc|cac/g;
  regExpQuantity = /\d+\s*/g;
  regExpDe = /de/g;
  regExpD1 = /[d][']?\s+/g;
  regExpD2 = /[d][']?\s*\w*/g;
  regExpD2Rest = /(?![d]['])\w*/g;   /* regex excluding "d'". For example in "d'oeuf", we only keep "oeuf" */
  regExpExceptGramms = /(?!\d+?)(?![grammes])(?![d][e])(?!d')\w*/g;
  regExpKilos = /\d+[k][g]?[i]?[l]?[o]?[g]?[r]?[a]?[m]?[e]?[s]?/g;
  regExpKiloWord = /[k][g]?[i]?[l]?[o]?[g]?[r]?[a]?[m]?[e]?[s]?/g;
  regExpLitres = /\d+[l][i]?[t]?[r]?[e]?[s]?/g;
  regExpLitreWord = /[l][i]?[t]?[r]?[e]?[s]?/g;

  constructor() { }

  /* verifying if it is followed by "de", "d'" */

  pushInfoIntoInfoFromRecipeWithDeOrD(recipeArray: any, infoFromRecipe: string[], element: any, index: number, place: number) {
    if (!element || !recipeArray) return;
    if (recipeArray[index + place].match(this.regExpDe)) { 
      infoFromRecipe.push(element.match(this.regExpQuantity).toString()) && infoFromRecipe.push(this.getEndOfArrayAsSentence(recipeArray, index + place + 1));
    } else if (recipeArray[index + place].match(this.regExpD1)) {
      infoFromRecipe.push(element.match(this.regExpQuantity).toString()) && infoFromRecipe.push(this.getEndOfArrayAsSentence(recipeArray, index + place + 1));
    } else if (recipeArray[index + place].match(this.regExpD2)) {
      infoFromRecipe.push(element.match(this.regExpQuantity).toString()) && infoFromRecipe.push(this.getEndOfArrayAsSentence(recipeArray, index + place).match(this.regExpD2Rest)[1]);
    } else {
      infoFromRecipe.push(element.match(this.regExpQuantity).toString()) && infoFromRecipe.push(this.getEndOfArrayAsSentence(recipeArray, index + place));
    }
  }

  /* get the ingredients composed of several words such as "sucre de canne" */

  getEndOfArrayAsSentence(array: string[], place: number): any {
    let array2 = [];
    for (let i = place; i < array.length; i++) {
      array2.push(array[i]);
    }
    return array2.join(' ');
  }
    
  /* applying regex to the recipe line to get infos" */

  getInfoFromRecipeRequestLine(recipeLine: any) {
    
    let recipeArrayTotal = recipeLine.split(" ");
    let recipeArray: string[] = [];

    recipeArrayTotal.forEach((element: any)=>{     /* filters spaces in the sentence */
        if (element !== "") recipeArray.push(element);
    });
    
    let infoFromRecipe: string[] = [];

    recipeArray.forEach((element: any, index: any) => {

        if (element.match(this.regExpGrams)) {
          infoFromRecipe[0] = 'grams'; /* the first key of the array is the type of info */
          this.pushInfoIntoInfoFromRecipeWithDeOrD(recipeArray, infoFromRecipe, element, index, 1);
    
        } else if (element.match(this.regExpKilos)) {
          infoFromRecipe[0] = 'kilos'; 
          this.pushInfoIntoInfoFromRecipeWithDeOrD(recipeArray, infoFromRecipe, element, index, 1);

        } else if (element.match(this.regExpLitres)) {
          infoFromRecipe[0] = 'litres'; 
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
              infoFromRecipe.push(element.match(this.regExpQuantity).toString()) && infoFromRecipe.push(recipeArray[index + 1]);
          } 
        };
    });
    console.log('result', infoFromRecipe);

    return infoFromRecipe;
  }
}
