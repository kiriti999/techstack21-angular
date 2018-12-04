import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RestApiService } from '../services/rest-api.service';
import { DataService } from '../services/data.service';
import { environment } from '../../environments/environment';
import { apiUrl } from '../api-call-list/api.call.list';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private blogs = new Subject();

  globalLogin$: Subject<any>;

  constructor(private data: DataService, private rest: RestApiService) {
    this.globalLogin$ = new Subject();
  }

  update(loggedIn) {
    this.globalLogin$.next(loggedIn);
  }

  loadBlogs(blogs) {
    this.blogs.next(blogs);
  }

  getBlogsByCategory() {
    return this.blogs.asObservable();
  }

}
