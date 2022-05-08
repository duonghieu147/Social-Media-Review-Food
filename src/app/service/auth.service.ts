import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../model/login-response.interface';
import { SignupRequest } from '../model/signup.interface';
const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private http: HttpClient) { }

    login(loginRequest: any): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(AUTH_API + 'signin', {
            username: loginRequest.username,
            password: loginRequest.password
        }, httpOptions);
    }

    register(signupRequest: any): Observable<SignupRequest> {
        return this.http.post<SignupRequest>(AUTH_API + 'signup', {
            //add more field to sign up
            username: signupRequest.username,
            email: signupRequest.email,
            password: signupRequest.password
        }, httpOptions);
    }
}