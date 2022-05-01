import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../../service/share.service';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  foodItemsList: Array<any>=[];
  foodItemsData: Array<any>=[];
  foodItems:any;

  constructor(
    public shareService:ShareService,
    private route: ActivatedRoute,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.getFoodShopById(3);
  }

  bindingFoodShopData(foodItems:any){
    var list =[];
    for (let index =0; index <foodItems.length; index++){
      var foodItem = foodItems[index];
      // console.log(foodItem.images)
      list.push([
        foodItem.id,
        foodItem.name,
        foodItem.images,
        foodItem.foodItemRating,
        foodItem.price,
        foodItem.like,
        foodItem.comments,
        foodItem.description
      ])
    }
    this.foodItemsList = this.foodItemsList.concat(list)
    this.foodItemsData = this.foodItemsData.concat(foodItems)
  }

  getFoodShopById(foodShopid:any){
    this.shareService.getFoodShopById(foodShopid).subscribe(
      (data) => {
        if(data.messages[0].code=="SUCCESS"){
          // console.log(data.data.foodItems)
          this.foodItems=data.data.foodItems
          this.bindingFoodShopData(data.data.foodItems)
          console.log(this.foodItemsList)
        }
        else{
          console.log("error")
        }
      }
    )
  }
}
