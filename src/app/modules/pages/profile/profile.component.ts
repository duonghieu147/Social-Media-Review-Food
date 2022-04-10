import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzIconService } from 'ng-zorro-antd/icon';
import * as cmn from 'src/app/constant/common'
import { PostService } from 'src/app/shared/post.service';
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
  userIdParams: any;
  isFollow:boolean=false;
  dataUser:any
  typeUser:string|null = 'user';

  constructor(
    private iconService: NzIconService,
    public shareService:ShareService,
    public PostService:PostService,
    private route: ActivatedRoute,

    ) { 
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
    });
  }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   console.log(params)
    //   this.userIdParams = params['id'];
    // });
    // this.typeUser = localStorage.getItem('types')
    this.userIdParams = this.route.snapshot.paramMap.get('id');
    this.getUserById()
    this.getPostByUserId()
  }

  changeModeProfile(mode: string) {
    this.modepage = mode;
    console.log(this.modepage);
  }
  changeFollow(){
    this.isFollow=!this.isFollow
  }

  getPostByUserId(){
    this.PostService.getPostByUserId(this.userIdParams,this.limit,this.page).subscribe(
      (data) => {
        if(data.data.length==0){
          return
        }
        else {
          this.bindingPostData(data.data)
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
        shortDescription,
        post.like
        ])
    }
    this.postList = this.postList.concat(list)
    this.postData =this.postData.concat(postData)
  }

  getUserById(){
    this.shareService.getUserById(this.userIdParams).subscribe(
      (data) => {
        if(data.data.length==0){
          return
        }
        else {
          console.log(data.data)
          this.dataUser=data.data
        }
      }
    )
  }
}
