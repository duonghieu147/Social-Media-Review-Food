import { Component, Input, OnInit } from '@angular/core';
import { addDays, formatDistance } from 'date-fns';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @Input() post: Array<any> = [];
  isWritenCmt:boolean=false;
  randomNumberLike:number=0 ;
  numberCmt:any =null ;
  randomNumberShare:number=0 ;
  isLike:boolean =false;

  constructor(
    public PostService:PostService,
  ) { }
  dataPost: any = [];
  dataRelpy :any = [];
  ngOnInit(): void {
    this.randomNumberLike=this.post[10]
    if(this.post[8]!=null) {
      this.numberCmt=this.post[8].length
    }
    if (this.post[0] == '7') {
      console.log(this.post[10])

    }

    this.randomNumberShare=this.getRandomNumber(10)
    this.bindingDataRelpy()
    this.dataPost = {
      idpost: this.post[0],
      author: this.post[2],
      avatar: this.post[1],
      content: this.post[3],
      createdTime:this.post[4],
      images:this.post[6],
      datetime: formatDistance(new Date(), addDays(new Date(), 1)),
      like:this.post[10],
    }
    console.log(this.dataPost.numbercmt)
  }

  bindingDataRelpy() {
    var list =[];
    if(this.post[8]!=null) {
      for (let index = 0; index < this.post[8].length; index++){
        list.push([this.post[8][index]])
      }
      // this.dataRelpy = this.dataRelpy.concat(list);
      this.dataRelpy =  list
      // console.log(this.dataRelpy[0][0].ownerName)
    }
  }
  // data = [
  //   {
  //     author: localStorage.getItem('name'),
  //     avatar: localStorage.getItem('avatar'),
  //     content:
  //       'We supply a series of design principles, practical patterns and high quality design resources' +
  //       '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  //     datetime: formatDistance(new Date(), addDays(new Date(), 1))
  //   },
  // ];
  



  // add comment
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // dataAdd: any[] = [];
  // submitting = false;
  // user = {
  //   author: localStorage.getItem('name'),
  //   avatar: localStorage.getItem('avatar'),
  // };
  // inputValue = '';

  // handleSubmit(): void {
  //   this.submitting = true;
  //   const content = this.inputValue;
  //   this.inputValue = '';
  //   console.log(new Date())
  //   setTimeout(() => {
  //     this.submitting = false;
  //     this.dataAdd = [
  //       ...this.dataAdd,
  //       {
  //         ...this.user,
  //         content,
  //         datetime: new Date(),
  //         displayTime: formatDistance(new Date(), new Date())
  //       }
  //     ].map(e => ({
  //       ...e,
  //       displayTime: formatDistance(new Date(), e.datetime)
  //     }));
  //   }, 800);
  // }

  showWritenCmt(){
    this.isWritenCmt=!this.isWritenCmt;
    localStorage.setItem('postId',this.post[0])
  }
  actionLikes(){
    if(this.isLike){
      this.dataPost.like=this.dataPost.like - 1
      this.dislikePost(this.dataPost.idpost)
      this.isLike=!this.isLike;
    }else{
      this.dataPost.like=this.dataPost.like + 1
      this.likePost(this.dataPost.idpost)
      this.isLike=!this.isLike;
    }

  }
  actionShare(){
    this.isWritenCmt=!this.isWritenCmt;
  }
  getRandomNumber(max:number) {
    return Math.floor(Math.random() * max);
  }

  likePost(postId:any) {
    this.PostService.likePost(postId).subscribe(
      (data) => {
        if (data.messages[0].code =="SUCCESS"){
          console.log("Like",data.messages[0].code) 
        }
        else {
          console.log("err like",data.messages[0].code)
        }
      })
  }
  dislikePost(postId:any){
    this.PostService.dislikePost(postId).subscribe(
      (data) => {
        if (data.messages[0].code =="SUCCESS"){
          console.log("Like",data.messages[0].code) 
        }
        else {
          console.log("err dislike",data.messages[0].code)
        }
      })
  }

}
 