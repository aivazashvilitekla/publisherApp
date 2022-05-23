import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface Barbarism {
  id?: number;
  wrong_word: string;
  correct_word: string;
  description: string;
}
@Injectable({
  providedIn: 'root',
})
export class BarbarismsService {
  constructor(private http: HttpClient) { }

  getBarbarisms(api: string) {
    return this.http.get(api);
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
