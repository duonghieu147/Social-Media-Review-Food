import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as cmn from 'src/app/constant/common';
import { PostService } from 'src/app/service/post.service';
import { ShareService } from 'src/app/service/share.service';
import { AddpostComponent } from 'src/app/shared/components/addpost/addpost.component';


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
  limit: number = 3;
  inputValue = 'Search'
  tag: string;
  isTag: boolean = false;
  userId: number;
  constructor(
    public shareService: ShareService,
    public postService: PostService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void { 
    console.log('init')
    this.route.queryParams.subscribe((queryParam) => {
      if (queryParam['isTag'] && queryParam['tag']) {
        console.log(queryParam);
        this.isTag = true;
        this.tag = queryParam['tag'];
        this.getAllPostByTag();
      }
      
    })
    if (localStorage.getItem('isLogin') != 'true') {
      this.router.navigate(['/login']);
    }
    else {
      if (this.isTag) {
        this.getAllPostByTag()
      } else {
        this.getAllPost()
      }
    }
  }
  getAllPost() {
    this.showLoading(true)
    this.userId = parseInt(localStorage.getItem('id')) == null ? null : parseInt(localStorage.getItem('id'));
    this.postService.getAllPost(this.userId, this.limit, this.page).subscribe(
      (data) => {
        if (data.data.length == 0) {
          this.isDone = true
          this.showLoading(false)
          return
        }
        else {
          this.bindingPostData(data.data)
          this.isloading = false;
          this.showLoading(false)
        }
      }
    )
  }
  getAllPostByTag() {
    this.showLoading(true)
    console.log(this.tag)
    this.postService.findByTag(this.tag, this.page, this.limit).subscribe(
      (data) => {
        if (data.data.length == 0) {
          this.isDone = true
          this.showLoading(false)
          return
        }
        else {
          this.bindingPostData(data.data)
          this.isloading = false;
          this.showLoading(false)
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
      post.userId,
      post.foodShopId,
      post.foodShopName,
      post.foodItemId,
      post.foodItemName,
      post.userIdOfShop
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

  }


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
    if (this.isTag) {
      this.getAllPostByTag
    } else {
      this.getAllPost()
    }
  }

  showLoading(isShow: boolean) {
    if (isShow) {
      document.getElementById('showLoading').classList.remove("hidden")
    }
    else {
      document.getElementById('showLoading').classList.add("hidden")

    }
  }

}

