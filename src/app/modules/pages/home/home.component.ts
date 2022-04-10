import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/shared/share.service';
import * as cmn from 'src/app/constant/common'
import {MatDialog} from '@angular/material/dialog';
import { AddpostComponent } from 'src/app/shared/components/addpost/addpost.component';
import { PostService } from 'src/app/shared/post.service';


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
  limit:number=10;
  inputValue='Search'
  constructor(
    public shareService:ShareService,
    public PostService: PostService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllPost()
  }
  getAllPost(){
    this.PostService.getAllPost(this.limit,this.page,).subscribe(
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
  openDialogCreatePost() {
  }
  showModal(): void {
    const dialogRef =this.dialog.open(AddpostComponent,{
        width: '700px',height:'auto'
    })
    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog result: ${result}`);
    })
  }

  // handleOk(): void {
  //   console.log('Button ok clicked!');
  //   this.isVisible = false;
  // }

  // handleCancel(): void {
  //   console.log('Button cancel clicked!');
  //   this.isVisible = false;
  // }
  // loginUser(){
  //   localStorage.setItem('id','1')
  //   localStorage.setItem('name','Thành')
  //   localStorage.setItem('firstName','Nguyễn Hữu Đức')
  //   localStorage.setItem('lastName','Thành')
  //   localStorage.setItem('phoneNumber','0395455399')
  //   localStorage.setItem('avatar','https://recmiennam.com/wp-content/uploads/2019/11/hinh-nen-kakashi-hatake-2.jpg')
  //   localStorage.setItem('biography','1')
  //   localStorage.setItem('address','HCM')
  //   localStorage.setItem('types','user')
  // }
  // loginShop(){
  //   localStorage.setItem('id','1')
  //   localStorage.setItem('name','Coffee')
  //   localStorage.setItem('firstName','Fell Coffee')
  //   localStorage.setItem('lastName','Fell')
  //   localStorage.setItem('phoneNumber','0395455399')
  //   localStorage.setItem('avatar','https://recmiennam.com/wp-content/uploads/2019/11/hinh-nen-kakashi-hatake-2.jpg')
  //   localStorage.setItem('biography','1')
  //   localStorage.setItem('address','HCM')
  //   localStorage.setItem('types','shop')
  // }
  getInformation(){
    var inf =[]
    inf.push([
    localStorage.getItem('id'),
    localStorage.getItem('name'),
    localStorage.getItem('firstName'),
    localStorage.getItem('lastName'),
    localStorage.getItem('phoneNumber'),
    localStorage.getItem('avatar'),
    localStorage.getItem('biography'),
    localStorage.getItem('address'),
    localStorage.getItem('types')])
    return inf
  }
}

