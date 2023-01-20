import { Component, OnInit } from '@angular/core';
import { ApiSpoonacularService } from 'src/app/services/api-spoonacular.service';

@Component({
  selector: 'app-recipe-api-test',
  templateUrl: './recipe-api-test.component.html',
  styleUrls: ['./recipe-api-test.component.scss']
})
export class RecipeApiTestComponent implements OnInit{

  title?: string;
  imagePath?: string;
  //searchInput = 'recherche';

  constructor(private apiService: ApiSpoonacularService) {
  }

  ngOnInit(): void {
    this.apiService.getApiSpoonacular(1).subscribe((data)=>{
      console.log(data);
    });

    this.apiService.getApiSpoonacularByName('sandwich').subscribe((data)=>{
      console.log('data2', data);
    });
  }
}
