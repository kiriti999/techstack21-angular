import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalLoginService {

  globalLogin$: Subject<any>;

  constructor() {
    this.globalLogin$ = new Subject();
  }

  update(loggedIn) {
    this.globalLogin$.next(loggedIn);
  }
}
