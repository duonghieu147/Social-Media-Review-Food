import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ProgressInfo {
    percentage : number;
    fileName: string;
}
@Injectable({
    providedIn: 'root'
})


export class UploadFilesService {
    private baseUrl = `${environment.API_PATH}`;
    constructor(private http: HttpClient) { }

    upload(file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(req);
    }
    
    getFiles(): Observable<any> {
        return this.http.get(`${this.baseUrl}/files`);
    }
}