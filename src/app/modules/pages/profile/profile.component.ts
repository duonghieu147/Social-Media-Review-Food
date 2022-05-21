import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NzIconService } from 'ng-zorro-antd/icon';
import * as cmn from 'src/app/constant/common';
import { FoodShopService } from 'src/app/service/foodshop.service';
import { PostService } from 'src/app/service/post.service';
import { ShareService } from 'src/app/service/share.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { AddFoodItemComponent } from 'src/app/shared/components/addfooditem/addfooditem.component';
import { AddpostComponent } from 'src/app/shared/components/addpost/addpost.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  slideImage: string[];
  post: any
  postData: Array<any> = [];
  postList: Array<any> = [];
  foodItemsList: Array<any> = [];
  foodItemsData: Array<any> = [];
  foodShopData :Array<any> = [];
  foodItems: any;
  shopId: string;
  page: number = 0;
  limit: number = 5;
  modepage: string = ''
  userIdParams: any;
  isFollow: boolean = false;
  dataUser: any
  typeUser: string | null = 'user';
  userId: any;
  isDone = false;
  isShopManager = false;
  information:any

  constructor(
    private iconService: NzIconService,
    public shareService: ShareService,
    public postService: PostService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public tokenStorageService: TokenStorageService,
    private router: Router,
    private foodShopService: FoodShopService
  ) {
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
    });
  }

  ngOnInit(): void {
    if (!localStorage.getItem('modepage')){
      localStorage.setItem('modepage','home');
      this.modepage =localStorage.getItem('modepage')
    }

    if (localStorage.getItem('isLogin') != 'true') {
      this.router.navigate(['/login']);
    }
    else {
      this.userIdParams = this.route.snapshot.paramMap.get('id');
      localStorage.setItem('pageCurrent', this.userIdParams)
      this.userId = localStorage.getItem('id');
      this.getUserById();
      this.getPostByUserId();
      if (this.tokenStorageService.getUser().roles.includes('SHOP_MANAGER')) {
        this.isShopManager = true;
        this.getFoodShopByUserId(this.userId);
      }
    }

  }
  showModal(): void {
    const dialogRef = this.dialog.open(AddpostComponent, {
      width: '700px', height: 'auto'
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  changeModeProfile(mode: string) {
    localStorage.setItem('modepage',mode);
    this.modepage =localStorage.getItem('modepage')
  }
  changeFollow() {
    this.isFollow = !this.isFollow
  }
  loadNextPage() {
    this.page = this.page + 1;
    this.getPostByUserId()
  }
  openDialogLoading() {
    this.dialog.open(LoadingComponent, {
    })
  }

  getPostByUserId() {
    this.openDialogLoading()
    this.postService.getPostByUserId(this.userIdParams, this.limit, this.page).subscribe(
      (data) => {
        if (data.data.length == 0) {
          this.dialog.closeAll();
          this.isDone = true;
          return
        }
        else {
          this.bindingPostData(data.data)
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
      post.like
      ])
    }
    this.postList = this.postList.concat(list)
    this.postData = this.postData.concat(postData)
  }

  getUserById() {
    this.shareService.getUserById(this.userIdParams).subscribe(
      (data) => {
        if (data.data.length == 0) {
          return
        }
        else {
          console.log(data.data)
          this.dataUser = data.data

        }
      }
    )
  }

  //FoodShop 
  getFoodShopByUserId(userId: any) {
    this.foodShopService.getFoodShopByUserId(userId).subscribe(
      (data) => {
        if (data.messages[0].code == "SUCCESS") {
          // console.log(data.data.id)
          this.foodItems = data.data.foodItems
          this.shopId = data.data.id
          this.bindingFoodShopData(data.data)
          this.slideImage = data.data.images;
        }
        else {
          console.log("error")
        }
      }
    )
  }

  bindingFoodShopData(shopData: any) {
    var list = [];
    if (shopData != null) {
      for (let index = 0; index < shopData.length; index++) {
        var shop = shopData[index];
        list.push([
          shop.id,
          shop.name,
          shop.displayName,
          shop.phoneNumber,
          shop.avatar,
          shop.biography,
          shop.address,
        ])
      }
      this.foodShopData = this.foodShopData.concat(shop)
    }
  }


  //Food Item Controller
  dialogAddFoodItem(): void {
    const dialogRef = this.dialog.open(AddFoodItemComponent, {
      width: '700px', height: 'auto',
      data :{shopId:this.shopId,
        userId:this.userId,
      }


    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  openDialogEditProfile(): void {
    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      width: 'auto', height: 'auto',
      data :{user:this.dataUser,}
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }
}
