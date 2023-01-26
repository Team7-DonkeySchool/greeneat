import { Component } from '@angular/core';
import { IngredientsService } from 'src/app/services/ingredients.service';

@Component({
    selector: 'app-input-ingredients',
    templateUrl: './input-ingredients.component.html',
    styleUrls: ['./input-ingredients.component.scss']
})
export class InputIngredientsComponent {
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
