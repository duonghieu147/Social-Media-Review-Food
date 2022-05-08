import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzIconService } from 'ng-zorro-antd/icon';
import * as cmn from 'src/app/constant/common'
import {MatDialog} from '@angular/material/dialog';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { AddfooditemComponent } from 'src/app/shared/components/addfooditem/addfooditem.component';
import { ShareService } from 'src/app/service/share.service';
import { PostService } from 'src/app/service/post.service';

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
  foodItemsList: Array<any>=[];
  foodItemsData: Array<any>=[];
  foodItems:any;
  page :number=0;
  limit:number=5;
  modepage:string = 'home'
  userIdParams: any;
  isFollow:boolean=false;
  dataUser:any
  typeUser:string|null = 'user';
  userId :any;
  isDone = false;

  constructor(
    private iconService: NzIconService,
    public shareService:ShareService,
    public postService:PostService,
    private route: ActivatedRoute,
    public dialog: MatDialog,

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
    localStorage.setItem('pageCurrent',this.userIdParams)
    this.userId = localStorage.getItem('id');
    this.getUserById();
    this.getPostByUserId();
    this.getFoodShopById(3);
  }

  changeModeProfile(mode: string) {
    this.modepage = mode;
    console.log(this.modepage);
  }
  changeFollow(){
    this.isFollow=!this.isFollow
  }
  loadNextPage() {
    this.page = this.page + 1;
    this.getPostByUserId()
  }
  openDialogLoading(){
    const dialogRef =this.dialog.open(LoadingComponent,{
  })
  }
  getPostByUserId(){
    this.openDialogLoading()
    this.postService.getPostByUserId(this.userIdParams,this.limit,this.page).subscribe(
      (data) => {
        if(data.data.length==0){
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

  //FoodShop 
  getFoodShopById(foodShopid:any){
    this.shareService.getFoodShopById(foodShopid).subscribe(
      (data) => {
        if(data.messages[0].code=="SUCCESS"){
          // console.log(data.data.foodItems)
          this.foodItems=data.data.foodItems
          this.bindingFoodShopData(data.data.foodItems)
          console.log(this.foodItemsList)
        }
        else{
          console.log("error")
        }
      }
    )
  }
  bindingFoodShopData(foodItems:any){
    var list =[];
    for (let index =0; index <foodItems.length; index++){
      var foodItem = foodItems[index];
      // console.log(foodItem.images)
      list.push([
        foodItem.id,
        foodItem.name,
        foodItem.images,
        foodItem.foodItemRating,
        foodItem.price,
        foodItem.like,
        foodItem.comments
      ])
    }
    this.foodItemsList = this.foodItemsList.concat(list)
    this.foodItemsData = this.foodItemsData.concat(foodItems)
  }
  

  //Food Item Controller
  dialogAddFoodItem(): void {
    const dialogRef =this.dialog.open(AddfooditemComponent,{
        width: '700px',height:'auto'
    })
    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog result: ${result}`);
    })
  }
}
