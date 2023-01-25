import { Component, OnInit } from '@angular/core';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { RegexIngredientService } from 'src/app/services/regex-ingredient.service';

@Component({
  selector: 'app-input-ingredient',
  templateUrl: './input-ingredient.component.html',
  styleUrls: ['./input-ingredient.component.scss']
})
export class InputIngredientComponent implements OnInit {

  recipesIngredient?: string[];
  recipe?: string;
  infoFromRecipe?: string[];

  constructor (private regexIngredient: RegexIngredientService, private ingredientService: IngredientsService) {}

  ngOnInit(): void {
    
  }

  onSubmitIngredient(){

    this.recipesIngredient = this.recipe?.split("\n");

    this.recipesIngredient?.forEach((element)=>{
      this.infoFromRecipe = this.regexIngredient.getInfoFromRecipeRequestLine(element);

      console.log('test>>>>>', this.infoFromRecipe);

      this.ingredientService.getIngredientsByName(this.infoFromRecipe[2])
        .subscribe((data)=>{
          console.log(data);
        });
    })

  }
}
