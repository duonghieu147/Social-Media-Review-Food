import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'search-itemshop',
  templateUrl: './searchfoodshop.component.html',
  styleUrls: ['./searchfoodshop.component.css']
})
export class SearchFoodShop implements OnInit {
@Input() foodItem :any
random:any
  price: any;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log(this.foodItem[3])
    this.random = this.getRandomNumber(10)
    this.price = ((this.foodItem[3].quality + this.foodItem[3].price +this.foodItem[3].decoration +this.foodItem[3].overall)/4).toFixed(2)
  }
  getRandomNumber(max:number) {
    return Math.floor(Math.random() * max);
  }
}
