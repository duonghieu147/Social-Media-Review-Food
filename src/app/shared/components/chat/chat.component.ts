import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.interface';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';
import { AddpostComponent } from '../addpost/addpost.component';
import { MiniProfileComponent } from '../mini-profile/mini-profile.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user: User = Object.assign(<User>{}, {});
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserById(this.tokenStorage.getUser().id);
  }
  showModal(): void {
    const dialogRef = this.dialog.open(AddpostComponent, {
      width: '700px', height: 'auto'
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })

  }

  getUserById(id:any) {
    this.userService.findById(id).subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }
  onclick(){
      this.router.navigate(['/profile/'+this.tokenStorage.getUser().id]);

  }

  openDialogMiniProfile( ) {
    // this.dialog.open(MiniProfileComponent, {
    //   width: 'auto', height: 'auto',   
    // })
  }

  closeDialogMiniProfile( ) {
    // console.log( 'closeDialogMiniProfile')
  }

}
