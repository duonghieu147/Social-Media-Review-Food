import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-dialog-rating-shop',
  templateUrl: './dialog-rating-shop.component.html',
  styleUrls: ['./dialog-rating-shop.component.css'],
  encapsulation: ViewEncapsulation.Emulated

})
export class DialogRatingShopComponent implements OnInit {
  @Input('rating') private rating:any = [0 ,1 ,2];
  @Input('starCount') private starCount: number = 5;
  @Input('color') private color: string = 'accent';
  @Output() private ratingUpdated = new EventEmitter();

  private snackBarDuration: number = 2000;
  public ratingArr = [];
  
  userRating = {
    index1: 0,
    index2: 0,
    index3: 0,
  }
  constructor() {
  }


  ngOnInit() {
    console.log("a "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating:number,index:number) {
    console.log('rating',rating)

    // this.ratingUpdated.emit(rating);
    this.rating = rating
    // this.userRating.`{Ơindex}` =index
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}