import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/pages/home/home.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { ProfileComponent } from './modules/pages/profile/profile.component';
import { ShoppingComponent } from './modules/pages/shopping/shopping.component';
import { SignupComponent } from './modules/pages/signup/signup.component';
import { AddpostComponent } from './shared/components/addpost/addpost.component';
import { PostsComponent } from './shared/components/posts/posts.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'shopping', component: ShoppingComponent },
  { path: 'post', component: PostsComponent },
  { path: 'addpost', component: AddpostComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
