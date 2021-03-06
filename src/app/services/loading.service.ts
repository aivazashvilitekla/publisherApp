import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loading = new BehaviorSubject(false);
  get loading$() {
    return this._loading.asObservable();
  }

  constructor() {}

  startLoading() {
    this._loading.next(true);
  }

  stopLoading() {
    this._loading.next(false);
  }
}
