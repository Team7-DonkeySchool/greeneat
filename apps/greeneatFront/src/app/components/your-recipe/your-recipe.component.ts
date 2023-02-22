import { Component } from '@angular/core';

@Component({
  selector: 'app-your-recipe',
  templateUrl: './your-recipe.component.html',
  styleUrls: ['./your-recipe.component.scss']
})

export class YourRecipeComponent {
  public greenscore: number = 100;
  public greenscorecolor: any =this.ColorScore(this.greenscore);
  public Rscore: number = 0;
  public Gscore: number = 0;
  public Bscore: number = 0;


  public ColorScoreR(score: number) {
    this.Rscore = score + 225 - score * 2;
    return this.Rscore;
  }

  public ColorScoreG(score: number) {
    this.Gscore = score + score;
    return this.Gscore;
  }

  public ColorScoreB(score: number) {
    this.Bscore = 0;
    return this.Bscore;
  }

  //! color score
  public ColorScore(score: any) {
    return "color: rgb(" + this. ColorScoreR(score) + ", " + this.ColorScoreG(score) + ", " + this.ColorScoreB(score) + ");";

  }

}




