import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { postId: any, options: string },
    private router: Router,
    public postService: PostService,
    private _snackBar: MatSnackBar,


  ) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {

    if (this.data.options === 'post') {
      this.postService.deletePost(this.data.postId+0).subscribe((data) => {
        if (data) {
          console.log(data)
          this.openSnackBar('Deleted', 'Close')
          this.dialogRef.close();
        }
        else {
          this.openSnackBar('Delete Error', 'Close')
        }
      });
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2500 });
  }
}
