import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addDays, formatDistance } from 'date-fns';
import { Comment } from 'src/app/model/comment.interface';
import { CommentService } from 'src/app/service/comment.service';
import { PostService } from '../../../service/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  comment: Comment[] = [];

  @Input() post: Array<any> = [];
  isWritenCmt: boolean = false;
  randomNumberLike: number = 0;
  numberCmt: any = null;
  randomNumberShare: number = 0;
  isLike: boolean = false;
  isShowCommentReply = false;
  idReplyToShow: number = 0;


  constructor(
    public postService: PostService,
    public commentService: CommentService,
    private router: Router

  ) { }
  dataPost: any = [];
  ngOnInit(): void {
    this.randomNumberLike = this.post[10]
    if (this.post[8] != null) {
      this.numberCmt = this.post[8].length
    }
    if (this.post[0] == '7') {
      // console.log(this.post[10])

    }

    this.randomNumberShare = this.getRandomNumber(10)
    this.bindingDataReply()
    this.dataPost = {
      idpost: this.post[0],
      author: this.post[2],
      avatar: this.post[1],
      content: this.post[3],
      createdTime: this.post[4],
      images: this.post[6],
      tags:this.post[7],
      datetime: formatDistance(new Date(), addDays(new Date(), 1)),
      like: this.post[10],
    }
    // console.log(this.dataPost.numbercmt)
  }

  bindingDataReply() {
    if (this.post[8] != null) {
      this.comment = this.post[8]
      // console.log('comment', this.comment);
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
    this.router.navigate(['/profile/' + localStorage.getItem("id")]);
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
}

export interface Vegetable {
  name: string;
}
