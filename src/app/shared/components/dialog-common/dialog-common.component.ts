import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-common',
  templateUrl: './dialog-common.component.html',
  styleUrls: ['./dialog-common.component.css']
})
export class DialogCommonComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogCommonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCommonComponent,
    private router: Router,

  ) { }

  ngOnInit(
    
  ): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  routingCreateShop() {
    this.router.navigate(['/home/addfoodshop']);
    this.dialogRef.close();
  }
}
