import { Component, Input, OnInit } from '@angular/core';
import { formatDistance } from 'date-fns';
import { CommentService } from 'src/app/service/comment.service';
import { FoodItemService } from 'src/app/service/foodItem.service';
import { PostService } from '../../../service/post.service';
import { ShareService } from '../../../service/share.service';

@Component({
  selector: 'app-addcomment',
  templateUrl: './addcomment.component.html',
  styleUrls: ['./addcomment.component.css']
})
export class AddcommentComponent implements OnInit {
  @Input() iscommentPost: Boolean = true;
  @Input() id: number = null;

  dataCmt: any;
  user: any;
  isShowCommentReply: boolean = false;
  idReplyToShow: number;

  constructor(
    public shareService: ShareService,
    public postService: PostService,
    public foodItemService: FoodItemService,
    public commentService: CommentService
  ) { }
  ngOnInit(): void {
    console.log('this.iscommentPost ', this.iscommentPost == false)
    this.user = {
      author: localStorage.getItem('displayName'),
      avatar: localStorage.getItem('avatar')
    };
  }
  data: any[] = [];
  submitting = false;

  inputValue = '';

  addComment(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.dataCmt = {
        userId: parseInt(localStorage.getItem('id')),
        content: content,
        parentId: this.id
      }
      if (this.iscommentPost === true) {
        this.createCommentPost(localStorage.getItem('postId'), this.dataCmt)

      }
      else {
        this.createCommentItemFood(localStorage.getItem('foodItemId'), this.dataCmt)
      }
      this.data = [
        ...this.data,
        {
          ...this.user,
          content,
          datetime: new Date(),
          displayTime: formatDistance(new Date(), new Date()),
          ownerAvatarUrl: localStorage.getItem('avatar')
        }
      ].map(e => ({
        ...e,
        displayTime: formatDistance(new Date(), e.datetime)
      }));
    }, 800);
    console.log(this.data)
  }
  createCommentPost(postId: any, comment: any) {
    this.postService.createCommentPost(postId, comment).subscribe(
      (data) => {
        console.log(data)
      }
    )
  }

  createCommentItemFood(postId: any, comment: any) {
    this.foodItemService.createCommentItemFood(postId, comment).subscribe(
      (data) => {
        console.log(data)
      }
    )
  }

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
