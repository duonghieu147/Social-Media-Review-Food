import { Component, OnInit ,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ShareService } from 'src/app/service/share.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  validateForm!: FormGroup;
  hide = true;
  myGroup: any;
  errorMessage = '';
  roles: string[] = [];
  isDisabled: boolean = true;
  submitForm(): void {
    if (this.myGroup.valid) {
      console.log('update profile');
      console.log(this.myGroup.value)
      // this.authService.register(this.myGroup.value).subscribe(
      //   data => {
      //     console.log(data)
      //     this.router.navigate(['/login']);
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
    private tokenStorage: TokenStorageService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    this.myGroup = new FormGroup({
      email: new FormControl(this.data.user.email, [Validators.required,Validators.email]),
      firstName: new FormControl('', [Validators.required,]),
      lastName: new FormControl('', [Validators.required,]),
      phone: new FormControl(this.data.user.phoneNumber, [Validators.required,Validators.maxLength(11),]),
      address: new FormControl(this.data.user.address, [Validators.required,]),
      avatar: new FormControl(this.data.user.avatar, [Validators.required,]),
    });
    console.log('ss',this.data.user)
  }
  checkValue( ) {
    if(this.myGroup.valid) {
      this.isDisabled = false;
    }
  }
  updateProfile() {
    this.submitForm()
  }
  back() {
    const idUser = localStorage.getItem('id')
    this.router.navigate(['/home/post/'+idUser]);
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

