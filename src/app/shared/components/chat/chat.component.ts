import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddpostComponent } from '../addpost/addpost.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(    
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }
  showModal(): void {
    const dialogRef =this.dialog.open(AddpostComponent,{
        width: '700px',height:'auto'
    })
    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog result: ${result}`);
    })
  }
}
