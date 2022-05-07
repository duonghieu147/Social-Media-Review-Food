import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { Location } from '../model/location.interface';
import { BaseResponse } from '../model/response.interface';


// const defaultUrl = 'http://localhost:8080';
const defaultUrl = 'https://rfood.herokuapp.com';
@Injectable({
    providedIn: 'root'
})

export class LocationService {

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

    findAllProvince(): Observable<Location[]> {
        return this.http.get<BaseResponse<Location[]>>(defaultUrl + '/api/location/provinces')
            .pipe(
                map((res: BaseResponse<Location[]>) => {
                    console.log(res)
                    if (res.data) {
                        return res.data;
                    } else {
                        throw "error";
                    }
                }),
                catchError(this.handleError)
            );
    }

    findDistrictByProvinceId(provinceId: any): Observable<Location[]> {
        return this.http.get<BaseResponse<Location[]>>(defaultUrl + '/api/location/districts?provinceId=' + provinceId)
            .pipe(
                map((res: BaseResponse<Location[]>) => {
                    console.log(res)
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