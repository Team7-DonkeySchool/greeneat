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
  public recipe?: string;
  public greenScore: number = 0;
  public isGreenScoreVisible: boolean = false;
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
    if (!this.recipe) return;
    let scores = this.greenScoreService.calculateGreenScore(this.recipe);

    // scores = [greenScore, ecoScore, co2Score, h2oScore, eqCo2Total, consoH2oTotal]
    // this.greenScore = scores[0];
    // this.ecoScore = scores[1];
    // this.co2Score = scores[2];
    // this.h2oScore = scores[3];
    // this.eqCo2Total = scores[4];
    // this.consoH2oTotal = scores[5];

    this.isGreenScoreVisible = true;

  }

}
