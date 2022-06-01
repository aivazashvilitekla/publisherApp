import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Morphology {
  Id?: number;
  Wrong_Word: string;
  Correct_Word: string;
}
export interface MorphologyPost {
  Id: number;
  Wrong_Word: string;
  Correct_Word: string;
}
@Injectable({
  providedIn: 'root',
})
export class MorphologyService {
  constructor(private http: HttpClient) {}

  getMorphologies(api: string): Observable<MorphologyPost[]> {
    return this.http.get<MorphologyPost[]>(api);
  }
  //get
  getMorphology(api: string) {
    return this.http.get(api);
  }

  //
  addMorphology(api: string, body: Morphology) {
    return this.http.post(api, body);
  }
  editMorphology(api: string, body: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(api, body, { headers });
  }
  deleteMorphology(api: string) {
    return this.http.delete(api);
  }
}
