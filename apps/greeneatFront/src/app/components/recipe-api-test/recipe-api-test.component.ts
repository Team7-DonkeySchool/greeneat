import { Component, OnInit } from '@angular/core';
import { ApiSpoonacularService } from 'src/app/services/api-spoonacular.service';
import { Recipe } from 'src/app/typings';

@Component({
  selector: 'app-recipe-api-test',
  templateUrl: './recipe-api-test.component.html',
  styleUrls: ['./recipe-api-test.component.scss']
})
export class RecipeApiTestComponent implements OnInit{

  title?: string;
  image?: string;
  searchInput = '';
  idRecipe = 1;
  titleResult?: string;
  imageResult?: string;
  recipes?: any;
  imageRecipeUrl = 'https://spoonacular.com/recipeImages/';

  constructor(private apiSpoonService: ApiSpoonacularService) {
  }

  ngOnInit(): void {
    this.apiSpoonService.getApiSpoonacularById(this.idRecipe).subscribe((data)=>{
      console.log(data);
      this.title = data.title;
      this.image = data.image;

    });
  }

  onSearchRecipe() {
    this.apiSpoonService.getApiSpoonacularByName(this.searchInput).subscribe((data)=>{
      this.recipes = data.results;
      console.log(this.recipes);
    });
  }
}
