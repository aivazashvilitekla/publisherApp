import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  api = 'localhost:44371/api/';

  // localhost:44371/api/TakeDoc [post]
  uploadFile(body: any){
    return this.http.post(`${this.api}/TakeDoc`, body)
  }
  //get
  hypDoc(fileName: string){
    return this.http.get(`${this.api}/HypDoc/${fileName}`)
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
