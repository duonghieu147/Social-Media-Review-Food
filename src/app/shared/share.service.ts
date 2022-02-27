import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';



const baseUrl = 'https://60faace37ae59c0017166267.mockapi.io/api/v1/';
const postURL = 'http://localhost:8080/api/post';
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

  getAllshopping():Observable<any> { 
    return this.http.get<Config>(baseUrl+'shopping')
        .pipe(
            catchError(this.handleError)
        );
  }

  getAllCmt(idPost:number):Observable<any> { 
    return this.http.get<Config>(baseUrl+'shopping/'+idPost+'/Comment')
        .pipe(
            catchError(this.handleError)
        );
  }

  getRates(idPost:number):Observable<any> { 
    return this.http.get<Config>(baseUrl+'shopping/'+idPost+'/rates/1')
        .pipe(
            catchError(this.handleError)
        );
  }
  

  //API Post
  getAllPost(page=0,limit=20):Observable<any> { 
    return this.http.get<Config>(postURL+'/findall'+'?page='+page+'&limit='+limit)
        .pipe(
            catchError(this.handleError)
        );
  }

  getPostById(idPost:number):Observable<any> { 
    return this.http.get<Config>(postURL+'?postId='+idPost)
        .pipe(
            catchError(this.handleError)
        );
  }

  getPostByIdUser(idUser:number):Observable<any> { 
    return this.http.get<Config>(postURL+'/findbyuserid'+'?postId='+idUser)
        .pipe(
            catchError(this.handleError)
        );
  }
}