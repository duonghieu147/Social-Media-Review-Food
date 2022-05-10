import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  constructor(
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    
  }
  changePassword(): void {
    const dialogRef =this.dialog.open(ChangepasswordComponent,{
        width: '500px',height:'auto'
    })
    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog result: ${result}`);
    })
  }
}
