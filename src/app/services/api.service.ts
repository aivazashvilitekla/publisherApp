import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  api = 'localhost:44371/api';

  // https://localhost:44371/api/TakeDoc [post]
  
  uploadFile(api: string, body: any, obj?: any){
    return this.http.post(api, body,obj)
  }
  //get
  hypDoc(api: string, fileName?: string){
    return this.http.get(api)
  }

  // 
  getPages(fileName: string){
    return this.http.get(`${this.api}/GetDocPage/${fileName}`)
  }
  getSInglePage(fileName: string, n: number){
    return this.http.get(`${this.api}/GetDocPage/${fileName}?page=$`)
  }
  downloadFile(fileName: string, pdf: boolean = false){
    return this.http.get(`${this.api}/SaveWork/${fileName}?pdf=${pdf}`)
  }
}
