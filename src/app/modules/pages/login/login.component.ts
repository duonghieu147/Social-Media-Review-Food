import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ShareService } from 'src/app/service/share.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  hide = true;
  myGroup: any;
  errorMessage = '';
  roles: String[] = [];
  isDisabled: boolean = true;

  submitForm(): void {
    if (this.myGroup.valid) {
      this.openDialogLoading()
      this.authService.login(this.myGroup.value).subscribe(
        data => {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);
          this.roles = this.tokenStorage.getUser().roles;
          console.log(this.roles)
          this.getDataUserById(data.id)
          this.dialog.closeAll();
          this.router.navigate(['/home/post']);
          this.openSnackBar('Successfully', 'Close');
        },
        err => {
          this.errorMessage = err.error.message;
          this.dialog.closeAll();
          this.openSnackBar('Đăng nhập thất bại', 'Close');

        }
      );
    } else {
      this.openSnackBar('Vui lòng nhập đúng trường', 'Close')
    }
  }

  constructor(
    public shareService: ShareService,
    private _snackBar: MatSnackBar,
    public snackBar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.myGroup = new FormGroup({
      username: new FormControl('', [Validators.required,]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

  }
  signUp() {
    this.router.navigate(['/signup']);
  }
  signIn() {
    this.submitForm()
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2500 });
  }
  getDataUserById(userId: any) {
    this.shareService.getUserById(userId).subscribe(
      (data) => {
        if (data.data.length == 0) {
          return
        }
        else {
          this.saveInfoUser(data.data)
        }
      }
    )
  }
  saveInfoUser(data: any) {
    localStorage.setItem('id', data.id)
    localStorage.setItem('name', data.firstName)
    localStorage.setItem('displayName', data.displayName)
    localStorage.setItem('phoneNumber', data.phoneNumber)
    localStorage.setItem('avatar', data.avatar)
    localStorage.setItem('biography', data.avatar)
    localStorage.setItem('address', data.address)
  }
  reloadPage() {
    window.location.reload();
  }
  checkValue() {
    if (this.myGroup.valid) {
      this.isDisabled = false;
    }
  }
  openDialogLoading(){
    const dialogRef =this.dialog.open(LoadingComponent,{
    })
  }
}
