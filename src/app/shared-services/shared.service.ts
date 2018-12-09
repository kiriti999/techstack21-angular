import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { RestApiService } from '../services/rest-api.service';
import { DataService } from '../services/data.service';
import { environment } from '../../environments/environment';
import { apiUrl } from '../api-call-list/api.call.list';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private blogs = new ReplaySubject();

  globalLogin$: ReplaySubject<any>;

  constructor(private data: DataService, private rest: RestApiService) {
    this.globalLogin$ = new ReplaySubject();
  }

  update(loggedIn) {
    this.globalLogin$.next(loggedIn);
  }

  loadBlogs(blogs) {
    this.blogs.next(blogs);
  }

  async blogsInitialLoad() {
    try {
      const data = await this.rest.get(environment.apiHost + apiUrl['data-on-page-load']);
      if (data['success']) {
        this.blogs.next(data['blogs']);
      } else {
        this.data.error('Could not on-load data');
      }
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  getBlogs() {
    return this.blogs.asObservable();
  }

}
