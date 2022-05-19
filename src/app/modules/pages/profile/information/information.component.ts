import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  @Input() dataUser:any
  constructor(
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    console.log(this.dataUser)
    console.log(this.dataUser.displayName)
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
}
