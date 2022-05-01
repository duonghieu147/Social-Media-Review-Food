import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';


const defaultUrl = 'http://localhost:8080';

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

  addFoodItemToShop(data:any,foodItemId:any):Observable<any>{
    return this.http.put<Config>(defaultUrl+'/api/foodshop/addfooditem?foodShopId='+ foodItemId,data)
          .pipe(
              catchError(this.handleError)
          );
  }
}