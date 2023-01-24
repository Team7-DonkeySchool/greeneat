import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-userrecipe',
  templateUrl: './userrecipe.component.html',
  styleUrls: ['./userrecipe.component.scss']
})
export class UserrecipeComponent {

  title = 'Renseignez vos ingrédients :';

  contactForm;


  constructor(private formBuilder: FormBuilder) {

    this.contactForm = this.formBuilder.group({
      ingredient1: [", "]
    });
  }

  //   onSearchRecipe() {
  //     this.formBuilder.getGreenScoreForRecipe(this.searchInput).subscribe((data)=>{
  //       this.formBuilder = data.results;
  //       console.log(this.formBuilder);
  //     });
  // }

}
