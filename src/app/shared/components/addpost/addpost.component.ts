import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent {
  inputValue: string = '';

  suggestions = ['Coffee', 'Do uong', 'user 1', 'user 2', 'Nha hang 1', 'Quan'];

  validateForm!: FormGroup;

  submitForm(): void {
    console.log('submit', this.validateForm.value.description);
    var img = [];
    img.push(this.validateForm.value.images)
    img.push(this.validateForm.value.images2)
    img.push(this.validateForm.value.images3)
    console.log('img', img);
    this.PostService.createPost({
      "description": this.validateForm.value.description,
      "userId": localStorage.getItem("id"),
      "images": img,
    }).subscribe(
      (data) => {
        if (data) {
          console.log(data)
          this.dialogRef.close();
          this.openSnackBar('Successfully', 'Close')
          this.router.navigate(['/home']);
        }
        else {
          this.openSnackBar('Create Post Error', 'Close')
        }}
     )
  }

  constructor(
    private _snackBar: MatSnackBar,
    public PostService: PostService,
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
