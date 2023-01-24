import { Component, OnInit } from '@angular/core';
import { IngredientsService } from 'src/app/services/ingredients.service';

@Component({
  selector: 'app-ingredients-tests',
  templateUrl: './ingredients-tests.component.html',
  styleUrls: ['./ingredients-tests.component.scss']
})
export class IngredientsTestsComponent implements OnInit {

  name?: string;
  valuesToTreat?: any;

  constructor (private ingredientsService: IngredientsService) {}

  ngOnInit(): void {
  }

  onSearchByName() {
    if (!this.name) return;
    
    this.ingredientsService.getIngredientsByName(this.name).subscribe((data)=>{
      this.valuesToTreat = data["hydra:member"];
      console.log(this.valuesToTreat);
    })
  }
}
