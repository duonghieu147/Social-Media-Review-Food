import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent {
  inputValue: string = '';

  suggestions = ['Coffee', 'Douong', 'highland', 'duonghieu147 ', 'reivew', 'sanpham'];

  validateForm!: FormGroup;
  tags: any;

  submitForm(): void {
    console.log('submit', this.validateForm.value.description);
    var img = [];
    if(this.validateForm.value.images!= null) {
      if(this.validateForm.value.images.trim() !='') {
        img.push(this.validateForm.value.images)
      }
    }
    if(this.validateForm.value.images2!= null) {
      if(this.validateForm.value.images2.trim() !='') {
        img.push(this.validateForm.value.images2)
      }
    }
    if(this.validateForm.value.images3!= null) {
      if(this.validateForm.value.images3.trim() !='') {
        img.push(this.validateForm.value.images3)
      }
    }
    this.postService.createPost({
      "description": this.validateForm.value.description,
      "userId": localStorage.getItem("id"),
      "images": img,
      "tags":this.tags
    }).subscribe(
      (data) => {
        if (data) {
          console.log(data)
          this.openSnackBar('Successfully', 'Close')
          this.router.navigate(['/home/done']);
          this.dialogRef.close();
        }
        else {
          this.openSnackBar('Create Post Error', 'Close')
        }}
     )
  }

  constructor(
    private _snackBar: MatSnackBar,
    public postService: PostService,
    private fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<AddpostComponent>) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      description: [null],
      images: [null],
      images2: [null],
      images3: [null],
      tags: [null],
    });
  }

  onChange(value: string): void {
    console.log(value);
    this.tags = value.trim().split(" ")
    console.log(this.tags)
  }

  onSelect(suggestion: string): void {
    console.log(`onSelect ${suggestion}`);
  }
  cancel() {
    this.dialogRef.close();
    console.log('cancel');
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2500 });
  }
}
