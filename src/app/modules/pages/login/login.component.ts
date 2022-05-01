import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareService } from 'src/app/service/share.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  hide = true;
  myGroup: any;

  submitForm(): void {
    if (this.myGroup.valid) {
      console.log('submit', this.myGroup.value);
      if(this.myGroup.value.username =='thanhnhd1'){
        this.getDataUserById(1)
        this.router.navigate(['/home']);
        this.openSnackBar('Successfully', 'Close');
      }
      else if(this.myGroup.value.username =='duonghieu147'){
        this.getDataUserById(2)
        this.router.navigate(['/home']);
        this.openSnackBar('Successfully', 'Close');
      }
      else if(this.myGroup.value.username =='fellcoffee'){
        this.getDataUserById(3)
        this.router.navigate(['/home']);
        this.openSnackBar('Successfully', 'Close');
      }
      else {
        this.openSnackBar('Thông tin đăng nhập không chính xác', 'Close')

      }
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.myGroup = new FormGroup({
      username: new FormControl('', [Validators.required,]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

  }
  signUp() {

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

}
