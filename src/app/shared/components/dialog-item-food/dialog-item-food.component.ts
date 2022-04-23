import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-item-food',
  templateUrl: './dialog-item-food.component.html',
  styleUrls: ['./dialog-item-food.component.css']
})
export class DialogItemFoodComponent implements OnInit {
  isRateMode : boolean = false;
  isOwner:boolean =false;
  array = [
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/326279/pexels-photo-326279.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 
    'https://images.pexels.com/photos/4051008/pexels-photo-4051008.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  ];
  userIdParams:any;
  // @Input() foodItem: Array<any> = [];
  foodItem:any;
  price: any;
  ratingAverage: any;
  constructor(    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: {foodItems: any}
    ) { }

  ngOnInit(): void {
    this.foodItem = this.data
    if (this.foodItem[4]==null) {
      this.price=this.getRandomNumber(100000)
    }else {
      this.price = this.foodItem[4]
    }
    if (this.foodItem[3]==null) {
      this.ratingAverage = 0
    }
    else {
      // this.ratingAverage = this.foodItem[3].overall
      this.ratingAverage = (+this.foodItem[3].quality + this.foodItem[3].price +this.foodItem[3].decoration + 0)/3
    }

    console.log('click foodItem',this.data)
    if (localStorage.getItem('pageCurrent') ==localStorage.getItem('id')){ 
      this.isOwner= true
    }
  }
  
  changeModeRate(){
    this.isRateMode= !this.isRateMode;
  }
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 10;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  vertical=false;
  // value1 = 0+this.foodItem[3].quality;
  // value2 = 0+this.foodItem[3].price;
  // value3 = 0+this.foodItem[3].decoration;
  value1 = 0
  value2 = 0
  value3 = 0

  tickInterval = 1;

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }
  getRandomNumber(max:number) {
    return Math.floor(Math.random() * max);
  }
}
