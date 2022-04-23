import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogItemFoodComponent } from '../dialog-item-food/dialog-item-food.component';

@Component({
  selector: 'app-itemshop',
  templateUrl: './itemshop.component.html',
  styleUrls: ['./itemshop.component.css']
})
export class ItemshopComponent implements OnInit {
@Input() foodItem :any
random:any
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    // console.log(this.foodItem[2])
    this.random = this.getRandomNumber(10)
  }
  openDialog(){
    const dialogRef = this.dialog.open(DialogItemFoodComponent,
      {  width: '700px',height:'auto',data:this.foodItem}
  );
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getRandomNumber(max:number) {
    return Math.floor(Math.random() * max);
  }
}
