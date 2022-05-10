import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/user.interface';
import { UserService } from 'src/app/service/user.service';
import { AddpostComponent } from '../addpost/addpost.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user: User = Object.assign(<User>{}, {});
  constructor(
    public dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserById();
  }
  showModal(): void {
    const dialogRef = this.dialog.open(AddpostComponent, {
      width: '700px', height: 'auto'
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })

  }

  getUserById() {
    this.userService.findById(localStorage.getItem("id")).subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }
}
