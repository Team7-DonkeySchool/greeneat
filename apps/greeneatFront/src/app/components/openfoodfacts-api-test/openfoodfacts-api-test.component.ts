import { Component, OnInit } from '@angular/core';
import { ApiOpenfoodfactsService } from 'src/app/services/api-openfoodfacts.service';
import { Product } from 'src/app/typings';

@Component({
  selector: 'app-openfoodfacts-api-test',
  templateUrl: './openfoodfacts-api-test.component.html',
  styleUrls: ['./openfoodfacts-api-test.component.scss']
})
export class OpenfoodfactsApiTestComponent implements OnInit{

  productName?: string;
  products?: Product[];

  constructor(private openfoodfactsApiService: ApiOpenfoodfactsService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.productName) return;

    this.openfoodfactsApiService.getOpenFoodFactsProductByName(this.productName).subscribe((data)=>{
      this.products = data.products;
      console.log(this.products);
    })
  }
}
