import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FoodShopService } from 'src/app/service/foodshop.service';


@Component({
  selector: 'app-dialog-rating-shop',
  templateUrl: './dialog-rating-shop.component.html',
  styleUrls: ['./dialog-rating-shop.component.css'],
  encapsulation: ViewEncapsulation.Emulated

})
export class DialogRatingShopComponent implements OnInit {
  @Input('rating') private rating: any = [0, 1, 2];


  private snackBarDuration: number = 2000;
  public ratingArr = [];

  currentRate = [0, 0, 0, 0, 0, 0];

  constructor(
    public dialogRef: MatDialogRef<DialogRatingShopComponent>,
    public foodShopService: FoodShopService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {shopId: number}

  ) {
  }

  ngOnInit() {

  }

  submitForm(): void {
    console.log(this.currentRate ,this.data.shopId)
    const rate = {
      overall: this.currentRate[0],
      quality: this.currentRate[1],
      service: this.currentRate[2],
      price: this.currentRate[3],
      space: this.currentRate[4],
      location: this.currentRate[5]
    }
    this.foodShopService.ratingShopFood(this.data.shopId,rate).subscribe((data) => {
      if (data) {
          console.log(data)
          this.dialogRef.close();
          this.openSnackBar('Successfully', 'Close')
      }
      else {
          this.openSnackBar('Rating Error', 'Close')
      }
  });

  }
  cancel(): void {
    this.dialogRef.close();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2500 });
}
}
