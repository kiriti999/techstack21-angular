import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { DataService } from '../../services/data.service';
import { environment } from '../../../environments/environment';
import { apiUrl } from './../../api-call-list/api.call.list';
import { SharedService } from '../../shared-services/shared.service';

@Component({
  selector: 'app-right-rail',
  templateUrl: './right-rail.component.html',
  styleUrls: ['./right-rail.component.scss']
})
export class RightRailComponent implements OnInit {

  categories: any;
  blogs: [];

  constructor(
    private data: DataService,
    private rest: RestApiService,
    private _sharedService: SharedService
  ) { }

  async ngOnInit() {
    try {
      const data = await this.rest.get(environment.apiHost + apiUrl.getCategoriesOnPageLoad);
      data['success'] ? (this.categories = data['categories']) : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  async getBlogsByCategory(e) {
    try {
      const data = await this.rest.get(environment.apiHost + apiUrl['get_post_by_category']+'/'+e.target.id);
      if(data['success']) {
        (this.blogs = data['blogs']);
        this._sharedService.loadBlogs(data['blogs']);
      } else {
        this.data.error(data['message']);
      }
    } catch (error) {
      this.data.error(error['message']);
    }
  }

}
