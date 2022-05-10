import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ShareService } from 'src/app/service/share.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  validateForm!: FormGroup;
  hide = true;
  myGroup: any;
  errorMessage = '';
  roles: string[] = [];

  submitForm(): void {
    if (this.myGroup.valid) {
      console.log('đăng ký')
      // this.authService.login(this.myGroup.value).subscribe(
      //   data => {
      //     this.tokenStorage.saveToken(data.token);
      //     this.tokenStorage.saveUser(data);
      //     this.roles = this.tokenStorage.getUser().roles;
      //     this.getDataUserById(data.id)
      //     this.router.navigate(['/home']);
      //     this.openSnackBar('Successfully', 'Close');
      //   },
      //   err => {
      //     this.errorMessage = err.error.message;
      //   }
      // );
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
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.myGroup = new FormGroup({
      username: new FormControl('', [Validators.required,]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rePassword: new FormControl('', [Validators.required, Validators.minLength(6)])

    });

  }
  signUp() {
    this.submitForm()
  }
  signIn() {
    this.router.navigate(['/login']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2500 });
  }
  getDataUserById(userId: any) {
    this.shareService.getUserById(userId).subscribe(
      (data) => {
        if(data.data.length==0){
          return
        }
        else {
          console.log(data.data.id)
          this.saveInfoUser(data.data)
        }
      }
    )
  }
  saveInfoUser(data:any){
    localStorage.setItem('id',data.id)
    localStorage.setItem('name',data.firstName)
    localStorage.setItem('firstName',data.firstName)
    localStorage.setItem('lastName',data.lastName)
    localStorage.setItem('phoneNumber',data.phoneNumber)
    localStorage.setItem('avatar',data.avatar)
    localStorage.setItem('biography',data.avatar)
    localStorage.setItem('address',data.address)
    if(data.id !=3){
      localStorage.setItem('types','user')
    }
    else {
      if(data.id ==3){
        localStorage.setItem('types','shop')
      }
    }
  }
  reloadPage() {
    window.location.reload();
  }

}
