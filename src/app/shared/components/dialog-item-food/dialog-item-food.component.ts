import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentService } from 'src/app/service/comment.service';
import { FoodItemService } from 'src/app/service/foodItem.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-dialog-item-food',
  templateUrl: './dialog-item-food.component.html',
  styleUrls: ['./dialog-item-food.component.css']
})
export class DialogItemFoodComponent implements OnInit, AfterViewInit {

  isRateMode: boolean = false;
  isOwner: boolean = false;

  isModeComment: boolean = false;
  isWritenCmt: boolean = false;
  comment: any
  isShowCommentReply = false;
  idReplyToShow: number = 0;
  isLike: boolean = false;
  isShowOptions : boolean = false;

  array = [
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/326279/pexels-photo-326279.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/4051008/pexels-photo-4051008.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  ];
  // @Input() foodItem: Array<any> = [];
  foodItem: any;
  price: any;
  ratingAverage: any;
  countImg: number = 0;
  endLoading: boolean = true;
  imageObject=[];
  loginUserId: any;
  userIdParams: any;
  currentRate = [0, 0, 0, 0, 0, 0];

  constructor(private route: ActivatedRoute,
    public commentService: CommentService,
    public FoodItemService: FoodItemService,
    private _snackBar: MatSnackBar,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { foodItems: any }
  ) { }

  ngOnInit(): void {

    this.foodItem = this.data
    this.getFoodItemById(this.foodItem[0])
    localStorage.setItem('foodItemId', this.foodItem[0])
    if (this.foodItem[4] == null) {
      this.price = 'Chưa Cật Nhật Giá'
    } else {
      this.price = (+this.foodItem[4])
    }
    if (this.foodItem[3] == null) {
      this.ratingAverage = 0
    }
    else {
      this.ratingAverage = ((+this.foodItem[3].quality + this.foodItem[3].price + this.foodItem[3].decoration + this.foodItem[3].overall) / 4).toFixed(2)
    }

    console.log('click foodItem', this.data)
    if (localStorage.getItem('pageCurrent') == localStorage.getItem('id')) {
      this.isOwner = true
    }
    for (var i = 0; i < this.foodItem[2].length ;i++) {
      this.imageObject = this.imageObject.concat({
        'image': this.foodItem[2][i],
        'thumbImage':this.foodItem[2][i]
      })

    }


  }
  ngAfterViewInit(): void {
  }
  getFoodItemById(FoodItem: any) {
    this.FoodItemService.getFoodItemById(FoodItem).subscribe(
      (data) => {
        if (data.messages[0].code == "SUCCESS") {
          // console.log(data.data.comments)
          this.comment = data.data.comments
        }
        else {
          console.log("err dislike", data.messages[0].code)
        }
      }
    )
  }

  changeModeRate() {
    this.isRateMode = !this.isRateMode;
  }
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 10;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  vertical = false;
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
  getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
  }
  ratingFoodItem(value1: any, value2: any, value3: any, value4: any) {
    this.FoodItemService.ratingItemFood(this.foodItem[0], {
      price: this.currentRate[0],
      quality: this.currentRate[1],
      decoration: this.currentRate[2],
      overall: 0,
    }).subscribe(
      (data) => {
        if (data.messages[0].code == "SUCCESS") {
          this.openSnackBar('Rating Successfully', 'Close');
        }
        else {
          console.log("err rating", data.messages[0].code)
          this.openSnackBar('Error Rating', 'Close');
        }
      }
    )
    this.value1 = value1
    this.value2 = value2
    this.value3 = value3
    this.value4 = value4

  }
  changeModeComment() {
    this.isModeComment = !this.isModeComment;
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2500 });
  }
  loadImage(): void {
    console.log('loading image...');
    if (this.countImg == this.foodItem[2].length) {
      this.endLoading = true;
      // this.dialog.closeAll();
    }
    else {
      this.countImg++;
    }
  }

  // openDialogLoading() {
  //   this.dialog.open(LoadingComponent, {
  //   })
  // }
}
