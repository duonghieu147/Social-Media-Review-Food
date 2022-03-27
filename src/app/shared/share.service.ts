import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';


const defaultUrl = 'http://localhost:8080';

const commentUrl = 'http://localhost:8080/create';

const baseUrl = 'https://60faace37ae59c0017166267.mockapi.io/api/v1/';
const postURL = 'http://localhost:8080/api/post';
const jsonServer = "http://localhost:3000"

export interface Config {
  id: string;
  nasme: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})

export class ShareService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  getAllshopping(): Observable<any> {
    return this.http.get<Config>(baseUrl + 'shopping')
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllCmt(idPost: number): Observable<any> {
    return this.http.get<Config>(baseUrl + 'shopping/' + idPost + '/Comment')
      .pipe(
        catchError(this.handleError)
      );
  }

  getRates(idPost: number): Observable<any> {
    return this.http.get<Config>(baseUrl + 'shopping/' + idPost + '/rates/1')
      .pipe(
        catchError(this.handleError)
      );
  }


  // API Post
  getAllPost(page = 0, limit = 20): Observable<any> {
    return this.http.get<Config>(postURL + '/findall' + '?page=' + page + '&limit=' + limit)
      .pipe(
        catchError(this.handleError)
      );
  }

  addComment(postId: number, comment: any) {
    return this.http.put<any>(postURL + '/addcomment' + '?postId=' + postId, comment)
      .pipe(
        catchError(this.handleError)
      );
  }

  //Json server
  getItemByShop(shop:string):Observable<any>{
    return this.http.get<Config>(jsonServer+'/itemshop?shop='+shop)
          .pipe(
              catchError(this.handleError)
          );
  }

  //API Usern Controller
  getUser(userId:any):Observable<any>{
    return this.http.get<Config>(defaultUrl+'/api/user?id='+userId)
          .pipe(
              catchError(this.handleError)
          );
  }
  createUser(user:any):Observable<any>{
    return this.http.post<Config>(defaultUrl+'/api/user',user)
          .pipe(
              catchError(this.handleError)
          );
  }

  //API Comment Controller
  createComment(comment:any):Observable<any>{
    return this.http.post<Config>(defaultUrl+'/create',comment)
          .pipe(
              catchError(this.handleError)
          );
  }
  disLikeComment(commentId:any):Observable<any>{
    return this.http.post<Config>(defaultUrl+'/create',commentId)
          .pipe(
              catchError(this.handleError)
          );
  }
  likeComment(commentId:any):Observable<any>{
    return this.http.post<Config>(defaultUrl+'/create',commentId)
          .pipe(
              catchError(this.handleError)
          );
  }

  // Api Food Item Controller
  getFoodItemById(foodItemId:any):Observable<any>{
    return this.http.get<Config>(defaultUrl+'/api/fooditem/findbyid?id='+foodItemId)
          .pipe(
              catchError(this.handleError)
          );
  }
  ratingFoodItem(foodItemId:any,rating:any):Observable<any>{
    return this.http.post<Config>(defaultUrl+'/api/fooditem/rate?id='+foodItemId,rating)
          .pipe(
              catchError(this.handleError)
          );
  }

  //Api Food Shop Controller
  createFoodShop(foodItemId:any,rating:any):Observable<any>{
    return this.http.put<Config>(defaultUrl+'/create='+foodItemId,rating)
          .pipe(
              catchError(this.handleError)
          );
  }
}