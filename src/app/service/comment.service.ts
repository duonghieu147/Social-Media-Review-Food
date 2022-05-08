import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";


// const defaultUrl = 'http://localhost:8080';
const defaultUrl = 'https://rfood.herokuapp.com';

@Injectable({
  providedIn: 'root'
})

export class CommentService {

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

  like(commentId: any): Observable<any> {
    return this.http.put(defaultUrl + '/api/comment/like?commentId=' + commentId, commentId)
      .pipe(
        catchError(this.handleError)
      );
  }
  dislike(commentId: any): Observable<any> {
    return this.http.put(defaultUrl + '/api/comment/dislike?commentId=' + commentId, commentId)
      .pipe(
        catchError(this.handleError)
      );
  }

}