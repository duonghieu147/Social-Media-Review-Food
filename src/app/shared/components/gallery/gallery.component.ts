import { Component, Input, OnInit } from '@angular/core';
import { ShareService } from '../../../service/share.service';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  @Input() shopId: string;
  foodItemsList: Array<any>=[];
  foodItemsData: Array<any>=[];
  foodItems:any;
  isloading: boolean =true;

  constructor(
    public shareService:ShareService,
    private route: ActivatedRoute,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.getFoodShopById(this.shopId);
  }

  bindingFoodShopData(foodItems:any){
    var list =[];
    for (let index =0; index <foodItems.length; index++){
      var foodItem = foodItems[index];
      console.log(foodItem.comments)
      list.push([
        foodItem.id,
        foodItem.name,
        foodItem.images,
        foodItem.foodItemRating,
        foodItem.price,
        foodItem.like,
        foodItem.comments,
        foodItem.description,
      ])
    }
    this.foodItemsList = this.foodItemsList.concat(list)
    this.foodItemsData = this.foodItemsData.concat(foodItems)
  }

  getFoodShopById(foodShopid:any){
    this.openDialogLoading()
    this.shareService.getFoodShopById(foodShopid).subscribe(
      (data) => {
        if(data.messages[0].code=="SUCCESS"){
          if(data.data.foodItems) {
            this.foodItems=data.data.foodItems
            this.bindingFoodShopData(data.data.foodItems)
            this.isloading=false;
            this.dialog.closeAll();
          }
          else
          console.log("shop chưa có sản phẩm")
          this.dialog.closeAll();
        }
        else{
          console.log("error")
        }
      }
    )
  }

  openDialogLoading(){
    const dialogRef =this.dialog.open(LoadingComponent,{
    })
  }
}
