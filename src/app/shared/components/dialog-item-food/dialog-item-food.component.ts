import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    this.isOwner= true;
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
  value1 = 0;
  value2 = 0;
  value3 = 0;

  tickInterval = 1;

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }
}
