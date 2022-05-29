import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { FoodShop } from '../model/foodshop.interface';
import { FoodSuggestion } from '../model/foodshopsuggest.interface';
import { ListDTO } from '../model/listdto.interface';
import { Rating } from '../model/foodshop.interface';
import { FoodShopRequest } from '../model/request/foodshop';
import { BaseResponse } from '../model/response.interface';


const defaultUrl = `${environment.API_PATH}`;
@Injectable({
    providedIn: 'root'
})

export class FoodShopService {

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

    findFoodShops(query: string, province: number, district: number, categoryId: number, page: number, limit: number): Observable<FoodShop[]> {
        let params = {};
        if (query != '') {
            params['query'] = query;
        }
        if (province > 0) {
            params['provinceId'] = province;
        }
        if (district > 0) {
            params['districtId'] = district;
        }
        if (categoryId > 0) {
            params['categoryId'] = categoryId;
        }
        if (page != null) {
            params['page'] = page;
        }
        if (limit != null) {
            params['limit'] = limit;
        }
        return this.http.get<BaseResponse<ListDTO<FoodShop>>>(defaultUrl + '/api/foodshop/search', {
            params: params
        })
            .pipe(
                map((res: BaseResponse<ListDTO<FoodShop>>) => {
                    if (res.data) {
                        console.log(res.data.items)
                        return res.data.items;
                    } else {
                        throw "error";
                    }
                }),
                catchError(this.handleError)
            );
    }

    findAll(page: number, limit: number): Observable<FoodShop[]> {
        let params = {};
        if (page != null) {
            params['page'] = page;
        }
        if (limit != null) {
            params['limit'] = limit;
        }
        return this.http.get<BaseResponse<ListDTO<FoodShop>>>(defaultUrl + '/api/foodshop/all', {
            params: params
        })
            .pipe(
                map((res: BaseResponse<ListDTO<FoodShop>>) => {
                    if (res.data) {
                        console.log(res.data.items)
                        return res.data.items;
                    } else {
                        throw "error";
                    }
                }),
                catchError(this.handleError)
            );
    }

    createFoodShop(body: FoodShopRequest): Observable<any> {
        return this.http.post<BaseResponse<FoodShopRequest>>(defaultUrl + '/api/foodshop', body);
    }

    getFoodShopByUserId(userId: any): Observable<any> {
        return this.http.get(defaultUrl + '/api/foodshop/findbyuserid?userId=' + userId)
            .pipe(
                catchError(this.handleError)
            );
    }

      findAllSuggestion(keyword:string): Observable<FoodSuggestion[]> {
        let params = {};
        if (keyword != null) {
            params['keyword'] = keyword;
        }
        return this.http.get<BaseResponse<FoodSuggestion[]>>(defaultUrl + '/api/foodshop/suggestion', {
            params: params
        })
            .pipe(
                map((res: BaseResponse<FoodSuggestion[]>) => {
                    if (res.data) {
                        return res.data;
                    } else {
                        throw "error";
                    }
                }),
                catchError(this.handleError)
            );
    }

    ratingShopFood(shopId: any,rating:Rating): Observable<any> {
        return this.http.post<any>(defaultUrl + '/api/foodshop/rate?id=' + shopId, rating)
            .pipe(
                catchError(this.handleError)
            );
      
    }
    
}