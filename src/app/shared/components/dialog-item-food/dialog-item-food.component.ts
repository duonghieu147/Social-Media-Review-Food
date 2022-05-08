import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommentService } from 'src/app/service/comment.service';
import { FoodItemService } from 'src/app/service/foodItem.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-item-food',
  templateUrl: './dialog-item-food.component.html',
  styleUrls: ['./dialog-item-food.component.css']
})
export class DialogItemFoodComponent implements OnInit {
  // @Input() iscommentPost: Boolean = true;

  isRateMode : boolean = false;
  isOwner:boolean =false;

  isModeComment : boolean = false;
  isWritenCmt: boolean = false;
  comment: any
  isShowCommentReply = false;
  idReplyToShow : number = 0;
  isLike: boolean = false;


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
    public commentService: CommentService,
    public FoodItemService :FoodItemService,
    private _snackBar: MatSnackBar,
    public snackBar: MatSnackBar,
    

    @Inject(MAT_DIALOG_DATA) public data: {foodItems: any}
    ) { }

  ngOnInit(): void {
    this.foodItem = this.data
    this.getFoodItemById(this.foodItem[0])
    localStorage.setItem('foodItemId',this.foodItem[0])
    if (this.foodItem[4]==null) {
      this.price='Chưa Cật Nhật Giá'
    }else {
      this.price = (+this.foodItem[4])
    }
    if (this.foodItem[3]==null) {
      this.ratingAverage = 0
    }
    else {
      this.ratingAverage = ((+this.foodItem[3].quality + this.foodItem[3].price +this.foodItem[3].decoration + this.foodItem[3].overall)/4).toFixed(2)
    }

    console.log('click foodItem',this.data)
    if (localStorage.getItem('pageCurrent') ==localStorage.getItem('id')){ 
      this.isOwner= true
    }
  }

  getFoodItemById(FoodItem:any) {
    this.FoodItemService.getFoodItemById(FoodItem).subscribe(
      (data) =>{
        if (data.messages[0].code == "SUCCESS") {
          console.log(data.data.comments)
          this.comment=data.data.comments
          // console.log(this.comment[0])
        }
        else {
          console.log("err dislike", data.messages[0].code)
        }
      }
    )
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
  value1 = 0
  value2 = 0
  value3 = 0
  value4 = 0
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
  ratingFoodItem(value1: any,value2: any,value3: any,value4: any) {
    this.FoodItemService.ratingItemFood(this.foodItem[0],{
      decoration:value1,
      overall:value2,
      price:value3,
      quality:value4
    }).subscribe(
      (data) =>{
        if (data.messages[0].code == "SUCCESS") {
          this.openSnackBar('Rating Successfully', 'Close');
        }
        else {
          console.log("err rating", data.messages[0].code)
          this.openSnackBar('Error Rating', 'Close');
        }
      }
    )
    this.value1= value1
    this.value2= value2
    this.value3= value3
    this.value4= value4

  }
  changeModeComment() {
    this.isModeComment= !this.isModeComment;
  }

  //comment
  // likeComment(commentId: any) {
  //   this.commentService.like(commentId);
  // }

  // dislikeComment(commentId: any) {
  //   this.commentService.dislike(commentId);
  // }

  // showWriteReply(commentId :any){
  //   this.isShowCommentReply= !this.isShowCommentReply;
  //   this.idReplyToShow = commentId;
  // }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2500 });
  }

}
