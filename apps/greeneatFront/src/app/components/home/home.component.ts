import { Component, OnInit, SimpleChanges } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  public isDark: boolean = false;
  public themeState$ = of(this.isDark);

  ngOnInit() {
    this.themeState$.subscribe(
      data => console.log(data)
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    this.themeState$.subscribe(
      data => console.log(data)
    )
  }

  yourfunc(e: any) {
    if(e.currentTarget.checked){     
      console.log('object');
    }
  }
}
