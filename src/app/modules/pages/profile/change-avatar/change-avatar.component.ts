import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, switchMap } from 'rxjs/operators';
import { UploadFilesService } from 'src/app/service/upload-file.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.css']
})
export class ChangeAvatarComponent implements OnInit {
  loginUserId: number;
  imageUrls: string[] = [];
  validateForm!: FormGroup;
  isLoadImg: boolean = true;

  images: string[] = [];
  constructor(
    private uploadService: UploadFilesService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ChangeAvatarComponent>,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {

    this.loginUserId = +localStorage.getItem('loginUserId')
  }
  submitForm(): void {
    // console.log(this.images)
    // this.uploadService.upload(this.images).pipe(
    //   switchMap((images: string[]) => {
    //     return this.userService.changeAvatar({
    //       "avatar": images[0]+'',
    //       "id": this.loginUserId
    //     })
    //   }),
    //   finalize(() => {
    //     // this.isLoading = false;
    //     // this.dialog.closeAll();
    //   })
    // ).subscribe(data => {
    //   if (data) {
    //     console.log(data)
    //   }
    //   else {
    //     this.openSnackBar('Change Avatar Error', 'Close')

    //   }
    // })

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2500 });
  }
  onSelectFile(event) {
    let files = event.target.files;
    if (files && files.length > 0) {
      for (let index = 0; index < files.length; index++) {
        this.readFile(files[index], this.images)
      }
      this.isLoadImg = false;
    }
  }
  removeImage(index: any) {
    //this.imageService.removeImage(index, [this.images, this.existingImages, this.imageIDs]);
  }

  readFile(file, listFile) {
    let reader = new FileReader();
    reader.onload = (event: any) => {
      listFile.push(event.target.result);
    };
    reader.readAsDataURL(file);
  }

  getImagesUrl() {
    return this.uploadService.upload(this.images).subscribe((res: string[]) => {
      this.imageUrls = res;
      console.log(res)
    })
  }
  cancel() {
    this.dialogRef.close();
    console.log('cancel');
  }
  // formInitialization() {
  //   this.validateForm = this.fb.group({
  //       images: [null],
  //   });
  // }
}
