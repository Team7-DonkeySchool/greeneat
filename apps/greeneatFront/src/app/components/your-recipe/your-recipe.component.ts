import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-your-recipe',
  templateUrl: './your-recipe.component.html',
  styleUrls: ['./your-recipe.component.scss']
})

export class YourRecipeComponent {

  @Input() greenScore: number = 0;
  @Input() ecoScore?: number;
  @Input() co2Score?: number;
  @Input() h2oScore?: number;
  @Input() eqCo2Total?: number;
  @Input() consoH2oTotal?: number;
  @Input() recipe?: string;
  ecoScoreLabel: string = "Le calcul de l'Eco-Score prend en compte : \
  la destruction de la couche d'ozone, \
  les émissions de particules fines, \
  l'oxydation photochimique, \
  l'acidification, \
  la radioactivité, \
  la pollution de l'eau douce, \
  l'épuisement des ressources non renouvelables, \
  l'eutrophisation (terrestre, eau douce & marine) (pollution de certains écosystèmes aquatiques), \n \
  l'utilisation des terres, \
  la toxicité humaine, \
  la perte de biodiversité \
  "

}
