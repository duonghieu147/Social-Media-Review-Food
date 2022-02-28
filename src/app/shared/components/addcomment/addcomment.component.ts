import { Component, OnInit } from '@angular/core';
import { formatDistance } from 'date-fns';
import { ShareService } from '../../share.service';
ShareService
@Component({
  selector: 'app-addcomment',
  templateUrl: './addcomment.component.html',
  styleUrls: ['./addcomment.component.css']
})
export class AddcommentComponent implements OnInit {
  dataCmt:any;

  constructor(
    public shareService:ShareService
  ) {}
  ngOnInit(): void {
  }
  data: any[] = [];
  submitting = false;
  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  inputValue = '';

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.dataCmt= {
        userId:2,
        content:content,
        createdTime: new Date()
      }
      this.addComment(13,this.dataCmt)
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
  addComment(postId:number,comment:any){
    console.log(comment)
    this.shareService.addComment(postId,comment).subscribe(
      (data) => {
        console.log(data)
      }
    )
  }
}
