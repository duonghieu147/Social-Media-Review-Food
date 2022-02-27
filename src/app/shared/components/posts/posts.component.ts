import { Component, Input, OnInit } from '@angular/core';
import { addDays, formatDistance } from 'date-fns';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @Input() post: Array<any> = [];

  constructor() { }
  dataPost: any = [];
  ngOnInit(): void {
    if (this.post[0] == '7') {
      console.log(this.post)

    }
    this.dataPost = {
      idpost: this.post[0],
      author: this.post[2],
      avatar: this.post[1],
      content: this.post[3],
      createdTime:this.post[4],
      images:this.post[6][0]
    }
    console.log(this.dataPost.images)
  }

  data = [
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: formatDistance(new Date(), addDays(new Date(), 1))
    },
  ];



  // add comment
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataAdd: any[] = [];
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
    console.log(new Date())
    setTimeout(() => {
      this.submitting = false;
      this.dataAdd = [
        ...this.dataAdd,
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
  }
}
