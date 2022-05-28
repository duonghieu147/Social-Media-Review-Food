import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/response.interface';
import { User } from '../model/user.interface';


const defaultUrl = `${environment.API_PATH}`;
@Injectable({
    providedIn: 'root'
})

export class UserService {

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

    findById(id: any): Observable<User> {
        return this.http.get<BaseResponse<User>>(defaultUrl + '/api/user?id=' + id)
            .pipe(
                map((res: BaseResponse<User>) => {
                    if (res.data) {
                        return res.data;
                    } else {
                        throw "error";
                    }
                }),
                catchError(this.handleError)
            );
    }

    changeAvatar(data: any): Observable<any> {
        return this.http.post<BaseResponse<User>>(defaultUrl + '/api/user/change-avatar', data)
            .pipe(
                catchError(this.handleError)
            );
    }

    changeAvatar(id: any, avatar: string) {
        return this.http.post<BaseResponse<void>>(defaultUrl + '/api/user/change-avatar', { id: id, avatar: avatar })
            .pipe(
                map((res: BaseResponse<void>) => {
                }),
                catchError(this.handleError)
            );

    }

    follow(id: number, targetId: number): Observable<any> {
        const params = new HttpParams()
            .set('userId', id)
            .set('targetId', targetId);
        return this.http.post(defaultUrl + '/api/user/follow', {}, { params }).pipe(
            map((res: BaseResponse<User>) => {
                if (res.data) {
                    return res.data;
                } else {
                    throw "error";
                }
            }),
            catchError(this.handleError)
        );
    }
    unfollow(id: number, targetId: number): Observable<any> {
        const params = new HttpParams()
            .set('userId', id)
            .set('targetId', targetId);
        return this.http.post(defaultUrl + '/api/user/unfollow', {}, { params }).pipe(
            map((res: BaseResponse<User>) => {
                if (res.data) {
                    return res.data;
                } else {
                    throw "error";
                }
            }),
            catchError(this.handleError)
        );
    }
    isFollower(id: number, targetId: number): Observable<any> {
        const params = new HttpParams()
            .set('userId', id)
            .set('targetId', targetId);
        return this.http.get(defaultUrl + '/api/user/check-follow', { params }).pipe(
            map((res: BaseResponse<Boolean>) => {
                if (res.data) {
                    return res.data;
                } else {
                    throw "error";
                }
            }),
            catchError(this.handleError)
        );
    }
}