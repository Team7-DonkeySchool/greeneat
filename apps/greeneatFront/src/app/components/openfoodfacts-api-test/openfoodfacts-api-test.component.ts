import { Component, OnInit } from '@angular/core';
import { ApiOpenfoodfactsService } from 'src/app/services/api-openfoodfacts.service';

@Component({
  selector: 'app-openfoodfacts-api-test',
  templateUrl: './openfoodfacts-api-test.component.html',
  styleUrls: ['./openfoodfacts-api-test.component.scss']
})
export class OpenfoodfactsApiTestComponent implements OnInit{

  productName?: string;
  nutriscore?: string;
  ecoscore?: string;
  fat_100g?: string;
  nameProductFound?: string;
  products: any;

  constructor(private openfoodfactsApiService: ApiOpenfoodfactsService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.productName) return;

    this.openfoodfactsApiService.getOpenFoodFactsProductByName(this.productName).subscribe((data)=>{
      this.products = data.products;
      console.log(this.products);
      this.nameProductFound = this.products.product_name_fr;
    })
  }
}
