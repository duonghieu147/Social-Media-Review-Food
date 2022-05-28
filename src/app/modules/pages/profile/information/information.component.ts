import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ChangeAvatarComponent } from '../change-avatar/change-avatar.component';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  @Input() dataUser:any
  userId: string;
  userIdParams: any;
  isOwner: boolean = false;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('loginUserId');
    this.userIdParams = this.route.snapshot.paramMap.get('id');
    this.isOwner =this.userId==this.userIdParams
  }
  changePassword(): void {
    const dialogRef =this.dialog.open(ChangepasswordComponent,{
        width: '500px',height:'auto',
        data :{data:this.dataUser}
    })
    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog result: ${result}`);
    })
  }
  openDialogAvatar() {
    this.dialog.open(ChangeAvatarComponent,{
      width:'500px',height:'auto',
    })
  }

}
