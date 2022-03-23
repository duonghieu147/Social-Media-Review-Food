import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogItemFoodComponent } from '../dialog-item-food/dialog-item-food.component';

@Component({
  selector: 'app-itemshop',
  templateUrl: './itemshop.component.html',
  styleUrls: ['./itemshop.component.css']
})
export class ItemshopComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }
  openDialog(){
    const dialogRef = this.dialog.open(DialogItemFoodComponent,
      {  width: '700px',height:'auto'}
  );
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
  }
}
