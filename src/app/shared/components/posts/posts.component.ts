import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { addDays, formatDistance } from 'date-fns';
import { Comment } from 'src/app/model/comment.interface';
import { CommentService } from 'src/app/service/comment.service';
import { PostService } from '../../../service/post.service';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { MiniProfileComponent } from '../mini-profile/mini-profile.component';
import { UpdatePostComponent } from '../update-post/update-post.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @ViewChild("avatar", {read: ElementRef}) avatar: ElementRef;
  @ViewChild("author", {read: ElementRef}) author: ElementRef;

  comment: Comment[] = [];
  @Input() post: Array<any> = [];
  isWritenCmt: boolean = false;
  randomNumberLike: number = 0;
  numberCmt: any = null;
  randomNumberShare: number = 0;
  isLike: boolean = false;
  isShowCommentReply = false;
  idReplyToShow: number = 0;
  loginUserId: string;
  isShowOptions: boolean = false;

  constructor(
    public postService: PostService,
    public commentService: CommentService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public snackBar: MatSnackBar

  ) { }
  dataPost: any = [];
  ngOnInit(): void {

    this.loginUserId = localStorage.getItem('loginUserId');
    if (this.loginUserId === this.post[11] + '') {
      this.isShowOptions = true
    }
    this.randomNumberLike = this.post[10]
    if (this.post[8] != null) {
      this.numberCmt = this.post[8].length
    }

    this.randomNumberShare = this.getRandomNumber(10)
    this.bindingDataReply()
    console.log(this.post)
    this.dataPost = {
      idpost: this.post[0],
      author: this.post[2],
      avatar: this.post[1],
      content: this.post[3],
      createdTime: this.post[4],
      images: this.post[6],
      tags: this.post[7],
      datetime: formatDistance(new Date(), addDays(new Date(), 1)),
      like: this.post[10],
      userId: this.post[11],
      foodShopId:this.post[12],
      foodShopName:this.post[13],
      foodItemId:this.post[14],
      foodItemName:this.post[15],
      userIdOfShop:this.post[16]
    }
  }

  bindingDataReply() {
    if (this.post[8] != null) {
      this.comment = this.post[8]
    }
  }

  showWritenCmt() {
    this.isWritenCmt = !this.isWritenCmt;
    localStorage.setItem('postId', this.post[0])
  }
  actionLikes() {
    if (this.isLike) {
      this.dataPost.like = this.dataPost.like - 1
      this.dislikePost(this.dataPost.idpost)
      this.isLike = !this.isLike;
    } else {
      this.dataPost.like = this.dataPost.like + 1
      this.likePost(this.dataPost.idpost)
      this.isLike = !this.isLike;
    }

  }
  actionShare() {
    this.isWritenCmt = !this.isWritenCmt;
  }
  getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
  }

  likePost(postId: any) {
    this.postService.likePost(postId).subscribe(
      (data) => {
        if (data.messages[0].code == "SUCCESS") {
        }
        else {
          console.log("err like", data.messages[0].code)
        }
      })
  }
  dislikePost(postId: any) {
    this.postService.dislikePost(postId).subscribe(
      (data) => {
        if (data.messages[0].code == "SUCCESS") {
        }
        else {
          console.log("err dislike", data.messages[0].code)
        }
      })
  }
  goToProfile() {
    this.router.navigate(['/profile/' + this.dataPost.userId]);
  }

  //Tags
  vegetables: Vegetable[] = [
    { name: 'tag1' },
    { name: 'coffee' },
    { name: 'duonghieu147' },
  ];

  drop(event: CdkDragDrop<Vegetable[]>) {
    moveItemInArray(this.vegetables, event.previousIndex, event.currentIndex);
  }
  //Tags


  //comment
  likeComment(commentId: any) {
    this.commentService.like(commentId);
  }

  dislikeComment(commentId: any) {
    this.commentService.dislike(commentId);
  }

  showWriteReply(commentId: any) {
    this.isShowCommentReply = !this.isShowCommentReply;
    this.idReplyToShow = commentId;
  }

  openDialogDelete(postId: number, options: any) {
    this.dialog.open(DialogDeleteComponent, {
      width: 'auto', height: 'auto',
      data: {
        postId: postId,
        options: options
      }
    })
  }

  openDialogUpdate(post: any, options: any) {
    this.dialog.open(UpdatePostComponent, {
      width: 'auto', height: 'auto',
      data: {
        post: this.dataPost,
        options: options
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2500 });
  }

  hanldHover() : void {
    console.log(this.avatar.nativeElement)
    console.log(this.author.nativeElement)
  }

  openDialogMiniProfile( ) {
    this.dialog.open(MiniProfileComponent, {
      width: 'auto', height: 'auto',   
      // data: {
      //   post :this.dataPost,
      //   options : options
      // }
    })
  }

  closeDialogMiniProfile( ) {
    // this.dialogRef.close();
    console.log( 'closeDialogMiniProfile')
  }

  onclickTag(tag: string) {
    this.router.navigate(['/home/post'], { 
      queryParams: { tag: tag, isTag: true }
     }).then(_ => {
       window.location.reload();
     })
  }
  goToShop(){
    console.log(this.dataPost.userIdOfShop)
    this.router.navigate(['/profile/' + this.dataPost.userIdOfShop]);
  }
}

export interface Vegetable {
  name: string;
}
