import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/shared/share.service';
import * as cmn from 'src/app/constant/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isVisible = false;

  post:any
  postData: Array<any>=[];
  postList: Array<any>=[];
  page :number=0;
  limit:number=1;

  constructor(
    public shareService:ShareService

  ) { }

  ngOnInit(): void {
    this.getAllshopping()
    // this.getAllshopping()
  }
  getAllshopping(){
    this.shareService.getAllPost(this.page,this.limit).subscribe(
      (data) => {
        if(data.data.length==0){
          return
        }
        else {
          // console.log(data.data)
          this.bindingPostData(data.data)
          // console.log(this.postData)
          // console.log(this.postList)     
        }
      }
    )
  }

  bindingPostData(postData:any){
    var list =[];
    

    for (let index = 0; index < postData.length; index++){
      var post=postData[index];
      var shortDescription =cmn.GetShortName(post.description,100);
      // var images=[];
      // var tags=[];
      // var commentResponses=[];
      // if (post.images != null) {
      //   for (let index = 0; index < post.images.length; index++){
      //     images.push(post.images[index]);
      //   }
      // }
      // if (post.tags != null) {
      //   for (let index = 0; index < post.tags.length; index++){
      //     tags.push(post.tags[index]);
      //   }
      // }
      // if (post.commentResponses != null) {
      //   for (let index = 0; index < post.commentResponses.length; index++){
      //     commentResponses.push(post.commentResponses[index]);
      //   }
      // }

      list.push([post.id,
        post.ownerAvatar,
        post.ownerName,
        post.description,
        post.createdTime,
        post.status,
        post.images,
        post.tags,
        post.commentResponses,
        shortDescription
        // images,
        // tags,
        // commentResponses,
        ])
    }
    this.postList = this.postList.concat(list)
    this.postData =this.postData.concat(postData)
  }
  openDialogCreatePost() {
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
 
}

