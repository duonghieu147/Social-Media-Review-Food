import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';




//
import { LoginComponent } from './modules/pages/login/login.component';
import { HomeComponent } from './modules/pages/home/home.component';
import { ProfileComponent } from './modules/pages/profile/profile.component';
import { ShoppingComponent } from './modules/pages/shopping/shopping.component';
import { PostsComponent } from './shared/components/posts/posts.component';
import { GalleryComponent } from './shared/components/gallery/gallery.component';
import { SilderbarLeftComponent } from './shared/components/silderbar-left/silderbar-left.component';
import { SilderbarRightComponent } from './shared/components/silderbar-right/silderbar-right.component';
import { SignupComponent } from './modules/pages/signup/signup.component';
import { CommentComponent } from './shared/components/comment/comment.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { AddpostComponent } from './shared/components/addpost/addpost.component';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { ChatComponent } from './shared/components/chat/chat.component';
import { AddcommentComponent } from './shared/components/addcomment/addcomment.component';
import { ItemshopComponent } from './shared/components/itemshop/itemshop.component';


//
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    ShoppingComponent,
    PostsComponent,
    GalleryComponent,
    SilderbarLeftComponent,
    SilderbarRightComponent,
    SignupComponent,
    CommentComponent,
    AddpostComponent,
    ChatComponent,
    AddcommentComponent,
    ItemshopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NzButtonModule,
    NzFormModule,
    NzMenuModule,
    NzToolTipModule,
    NzIconModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzCarouselModule,
    NzPageHeaderModule,
    NzDropDownModule,
    NzTagModule,
    NzImageModule,
    NzAvatarModule,
    NzTabsModule,
    NzCommentModule,
    NzListModule,
    NzUploadModule,
    NzModalModule,
    NgZorroAntdModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
