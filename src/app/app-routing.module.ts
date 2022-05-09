import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/pages/home/home.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { ProfileComponent } from './modules/pages/profile/profile.component';
import { RecordsComponent } from './modules/pages/records/records.component';
import { ShoppingComponent } from './modules/pages/shopping/shopping.component';
import { SignupComponent } from './modules/pages/signup/signup.component';
import { TestComponent } from './modules/pages/test/test.component';
import { AddpostComponent } from './shared/components/addpost/addpost.component';
import { PageNoteFoundComponent } from './shared/components/page-note-found/page-note-found.component';
import { PostsComponent } from './shared/components/posts/posts.component';
import { SearchFoodShop } from './shared/components/searchfoodshop/searchfoodshop.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, },
  { path: 'profile/:id', component: ProfileComponent,},
  { path: 'shopping', component: ShoppingComponent },
  { path: 'post', component: PostsComponent },
  { path: 'addpost', component: AddpostComponent },
  { path: 'records', component: RecordsComponent },
  { path: 'test', component: TestComponent },
  { path: 'search', component: SearchFoodShop },
  { path: '**', component: PageNoteFoundComponent },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
