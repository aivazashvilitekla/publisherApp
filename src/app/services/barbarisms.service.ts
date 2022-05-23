import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Barbarism {
  Id?: number;
  Wrong_Word: string;
  Correct_Word: string;
  Description: string;
}
export interface BarbarismPost {
  Id: number;
  Wrong_Word: string;
  Correct_Word: string;
  Description: string;
}
@Injectable({
  providedIn: 'root',
})
export class BarbarismsService {
  constructor(private http: HttpClient) { }

  getBarbarisms(api: string): Observable<BarbarismPost[]> {
    return this.http.get<BarbarismPost[]>(api);
  }
  //get
  getBarbarism(api: string) {
    return this.http.get(api);
  }

  // 
  addBarbarism(api: string, body: Barbarism) {
    return this.http.post(api, body);
  }
  editBarbarism(api: string, body: any) {
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");
    return this.http.put(api, body, {headers});
  }
  deleteBarbarism(api: string) {
    return this.http.delete(api);
  }
}
