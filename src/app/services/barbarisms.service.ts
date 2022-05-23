import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Barbarism {
  id?: number;
  Wrong_Word: string;
  Correct_Word: string;
  Description: string;
}
@Injectable({
  providedIn: 'root',
})
export class BarbarismsService {
  constructor(private http: HttpClient) { }

  getBarbarisms(api: string): Observable<Barbarism[]> {
    return this.http.get<Barbarism[]>(api);
  }
  //get
  getBarbarism(api: string) {
    return this.http.get(api);
  }

  // 
  addBarbarism(api: string, body: Barbarism) {
    return this.http.post(api, body);
  }
  editBarbarism(api: string, body: Barbarism) {
    return this.http.put(api, body);
  }
  deleteBarbarism(api: string) {
    return this.http.delete(api);
  }
}
