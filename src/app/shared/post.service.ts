import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';

const defaultUrl = 'http://localhost:8080';

// >>>>>>> ui

export interface Config {
    id: string;
    nasme: string;
    description: string;
}

@Injectable({
    providedIn: 'root'
})


export class PostService {

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


    //API POST Controller
    getPostById(postId: any): Observable<any> {
        return this.http.get<Config>(defaultUrl + '/api/post?postId=' + postId)
            .pipe(
                catchError(this.handleError)
            );
    }
    getAllPost(limit: any, page: any): Observable<any> { //page start 0
        return this.http.get<Config>(defaultUrl + '/api/post/findall?limit=' + limit + '&page=' + page)
            .pipe(
                catchError(this.handleError)
            );
    }
    getPostByUserId(userId: any, limit: any, page: any): Observable<any> { //page start 0
        return this.http.get<Config>(defaultUrl + '/api/post/findbyuserid?limit=' + limit + '&page=' + page + '&userId=' + userId)
            .pipe(
                catchError(this.handleError)
            );
    }
    createPost(post: any): Observable<any> { //Return data = null , status = 1 create, = 2 edit, =3 delete
        return this.http.post<Config>(defaultUrl + '/api/post/create', post)
            .pipe(
                catchError(this.handleError)
            );
    }

    deletePost(postId: any): Observable<any> { //Return data = null , status = 1 create, = 2 edit, =3 delete
        return this.http.put<Config>(defaultUrl + '/api/post?postId=' + postId, postId)
            .pipe(
                catchError(this.handleError)
            );
    }
    createCommentPost(postId: any, comment: any): Observable<any> {
        return this.http.put<Config>(defaultUrl + '/api/post/addcomment?postId=' + postId, comment)
            .pipe(
                catchError(this.handleError)
            );
    }
    likePost(postId: any): Observable<any> {
        return this.http.put<Config>(defaultUrl + '/api/post/like?postId=' + postId, postId)
            .pipe(
                catchError(this.handleError)
            );
    }
    dislikePost(postId: any): Observable<any> {
        return this.http.put<Config>(defaultUrl + '/api/post/dislike?postId=' + postId, postId)
            .pipe(
                catchError(this.handleError)
            );
    }
}