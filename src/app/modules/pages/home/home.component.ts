import { Component, OnInit } from '@angular/core';
import * as cmn from 'src/app/constant/common'
import { MatDialog } from '@angular/material/dialog';
import { AddpostComponent } from 'src/app/shared/components/addpost/addpost.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ShareService } from 'src/app/service/share.service';
import { PostService } from 'src/app/service/post.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isloading = true;
  isDone = false;
  isVisible = false;
  post: any
  postData: Array<any> = [];
  postList: Array<any> = [];
  page: number = 0;
  limit: number = 5;
  inputValue = 'Search'
  constructor(
    public shareService: ShareService,
    public postService: PostService,
    public dialog: MatDialog,
    private router: Router,

  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('isLogin') != 'true') {
      this.router.navigate(['/login']);
    }
    else {
      this.getAllPost()
    }
  }
  getAllPost() {
    this.openDialogLoading()
    this.postService.getAllPost(this.limit, this.page).subscribe(
      (data) => {
        if (data.data.length == 0) {
          this.dialog.closeAll();
          this.isDone = true
          return
        }
        else {
          this.bindingPostData(data.data)
          this.isloading = false;
          this.dialog.closeAll();
        }
      }
    )
  }

  bindingPostData(postData: any) {
    var list = [];
    for (let index = 0; index < postData.length; index++) {
      var post = postData[index];
      var shortDescription = cmn.GetShortName(post.description, 100);
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
      post.like,
      post.userId
      ])
    }
    this.postList = this.postList.concat(list)
    this.postData = this.postData.concat(postData)
  }
  openDialogCreatePost() {
  }
  showModal(): void {
    const dialogRef = this.dialog.open(AddpostComponent, {
      width: '700px', height: 'auto'
    })
    dialogRef.afterClosed().subscribe(result => {
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
  getInformation() {
    var inf = []
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

  loadNextPage() {
    this.page = this.page + 1;
    this.getAllPost()
  }

  openDialogLoading() {
    const dialogRef = this.dialog.open(LoadingComponent, {
    })
  }
}

