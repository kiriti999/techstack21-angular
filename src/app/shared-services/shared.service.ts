import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { RestApiService } from '../services/rest-api.service';
import { DataService } from '../services/data.service';
import { environment } from '../../environments/environment';
import { apiUrl } from '../api-call-list/api.call.list';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private blogs = new BehaviorSubject([]);

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

  async blogsFirstLoad() {
    try {
      const data = await this.rest.get(environment.apiHost + apiUrl["data-on-page-load"]);
      if (data['success']) {
        this.blogs.next(data['blogs']);
      } else {
        this.data.error('Could not on-load data');
      }
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  getBlogsByCategory() {
    // if (!this.blogs || this.blogs.length === 0) {
    //         this.initializeTasks();
    //     }
    return this.blogs.asObservable();
  }

}
