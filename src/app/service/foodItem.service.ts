import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { Rating } from '../model/fooditem.interface';

// const defaultUrl = 'http://localhost:8080';
const defaultUrl = 'https://rfood.herokuapp.com';
export interface Config { 
  id: string;
  nasme: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})

export class FoodItemService {

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

  getFoodItemById(foodItemId:any):Observable<any>{
    return this.http.get<Config>(defaultUrl+'/api/fooditem/findbyid?id='+ foodItemId)
          .pipe(
              catchError(this.handleError)
          );
  }

  addFoodItemToShop(data:any,foodItemId:any):Observable<any>{
    return this.http.put<Config>(defaultUrl+'/api/foodshop/addfooditem?foodShopId='+ foodItemId,data)
          .pipe(
              catchError(this.handleError)
          );
  }

  createCommentItemFood(postId: any, comment: any): Observable<any> {
    return this.http.post<Config>(defaultUrl + '/api/fooditem/comment?id=' + postId, comment)
        .pipe(
            catchError(this.handleError)
        );
  }
  likeItemFood(postId: any): Observable<any> {
    return this.http.post<Config>(defaultUrl + '/api/fooditem/like?id=' + postId, postId)
        .pipe(
            catchError(this.handleError)
        );
  }
  dislikeItemFood(postId: any): Observable<any> {
    return this.http.post<Config>(defaultUrl + '/api/fooditem/dislike?id=' + postId, postId)
        .pipe(
            catchError(this.handleError)
        );
  }

  ratingItemFood(postId: any,rating:Rating): Observable<any> {
    return this.http.post<Config>(defaultUrl + '/api/fooditem/rate?id=' + postId, rating)
        .pipe(
            catchError(this.handleError)
        );
  }
}