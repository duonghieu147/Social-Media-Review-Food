import { Component, OnInit } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import * as cmn from 'src/app/constant/common'
import { ShareService } from 'src/app/shared/share.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  array = [
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/326279/pexels-photo-326279.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 
    'https://images.pexels.com/photos/4051008/pexels-photo-4051008.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  ];

  post:any
  postData: Array<any>=[];
  postList: Array<any>=[];
  page :number=0;
  limit:number=5;
  modepage:string = 'home'



  constructor(
    private iconService: NzIconService,
    public shareService:ShareService
    ) { 
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
    });
  }

  ngOnInit(): void {
    this.getAllshopping()

  }

  changeModeProfile(mode: string) {
    this.modepage = mode;
    console.log(this.modepage);
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

        ])
    }
    this.postList = this.postList.concat(list)
    this.postData =this.postData.concat(postData)
  }



}
