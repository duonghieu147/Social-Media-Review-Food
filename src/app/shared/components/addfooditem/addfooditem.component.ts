import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { ShareService } from '../../../service/share.service';

@Component({
  selector: 'app-addfooditem',
  templateUrl: './addfooditem.component.html',
  styleUrls: ['./addfooditem.component.css']
})
export class AddFoodItemComponent  {

  validateForm!: FormGroup;
  shopId: any;

  submitForm(): void {
    console.log('submit', this.validateForm.value);
    var img = [];
    img.push(this.validateForm.value.images)
    img.push(this.validateForm.value.images2)
    img.push(this.validateForm.value.images3)
    console.log('img', img);
    this.shareService.addFoodItemToShop({
      "name": this.validateForm.value.name,
      "description": this.validateForm.value.description,
      // "userId": this.data.shopId,
      "images": img,
      "price": this.validateForm.value.price
    },this.data.shopId).subscribe(
      (data) => {
        if (data) {
          console.log(data)
          this.dialogRef.close();
          this.openSnackBar('Successfully', 'Close')
          this.router.navigate(['/profile/'+this.data.userId]);
          //  localStorage.setItem('modepage','product');
        }
        else {
          this.openSnackBar('Create Item Error', 'Close')
        }}
     )
  }

  constructor(
    private _snackBar: MatSnackBar,
    public shareService: ShareService,
    private fb: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public dialogRef: MatDialogRef<AddFoodItemComponent>) { }

  ngOnInit(): void {
    this.shopId = this.data.shopId
    this.validateForm = this.fb.group({
      name:[null],
      description: [null],
      images: [null],
      images2: [null],
      images3: [null],
      price: [null],
    });
  }

  cancel() {
    this.dialogRef.close();
    console.log('cancel');
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2500 });
  }
  getFoodItemById(idFood:any){
    this.shareService.getFoodItemById(idFood).subscribe(
      (data) => {
        if (data) {
          console.log(data)
          // this.router.navigate(['/profile/3']);
        }
        else {
          this.openSnackBar('Create Post Error', 'Close')
        }}
     )
  }
}
