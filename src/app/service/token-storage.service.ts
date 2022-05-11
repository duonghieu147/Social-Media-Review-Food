import { Injectable } from '@angular/core';
import { LoginResponse } from '../model/login-response.interface';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
    constructor() { }
    signOut() {
        window.sessionStorage.clear();
    }
    public saveToken(token: string) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }
    public getToken(): any {
        return sessionStorage.getItem(TOKEN_KEY);
    }
    public saveUser(user: LoginResponse) {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    public getUser():LoginResponse {
        return JSON.parse(sessionStorage.getItem(USER_KEY) || '{}');
    }
}