import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShareService } from 'src/app/service/share.service';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  validateForm!: FormGroup;
  hide = true;
  myGroup: any;
  errorMessage = '';
  roles: string[] = [];

  submitForm(): void {
    if (this.myGroup.valid) {
      this.openSnackBar('Đổi mật khẩu thành công', 'Close')
    }
  }

  constructor(
    public shareService: ShareService,
    private _snackBar: MatSnackBar,
    public snackBar: MatSnackBar,
    public dialog : MatDialog,
  ) { }

  ngOnInit(): void {
    this.myGroup = new FormGroup({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rePassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

  }

  confirm() {
    this.submitForm()
  }
  back(){
    this.dialog.closeAll();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2500 });
  }
  reloadPage() {
    window.location.reload();
  }

}



