import { Component, OnInit } from '@angular/core';
import { formatDistance } from 'date-fns';
import { PostService } from '../../post.service';
import { ShareService } from '../../share.service';
PostService
@Component({
  selector: 'app-addcomment',
  templateUrl: './addcomment.component.html',
  styleUrls: ['./addcomment.component.css']
})
export class AddcommentComponent implements OnInit {
  dataCmt:any;

  constructor(
    public shareService:ShareService,
    public PostService:PostService,
  ) {}
  ngOnInit(): void {
  }
  data: any[] = [];
  submitting = false;
  user = {
    author: localStorage.getItem('name'),
    avatar: localStorage.getItem('avatar')
  };
  inputValue = '';

  addComment(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.dataCmt= {
        userId:localStorage.getItem('id'),
        content:content,
        // createdTime: new Date()
      }
      this.createCommentPost(localStorage.getItem('postId'),this.dataCmt)
      this.data = [
        ...this.data,
        {
          ...this.user,
          content,
          datetime: new Date(),
          displayTime: formatDistance(new Date(), new Date())
        }
      ].map(e => ({
        ...e,
        displayTime: formatDistance(new Date(), e.datetime)
      }));
    }, 800);
    console.log(this.data)
  }
  createCommentPost(postId:any,comment:any){
    console.log(comment)
    this.PostService.createCommentPost(postId,comment).subscribe(
      (data) => {
        console.log(data)
      }
    )
  }
}
