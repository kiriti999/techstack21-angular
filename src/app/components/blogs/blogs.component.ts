import { apiUrl } from './../../api-call-list/api.call.list';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RestApiService } from '../../services/rest-api.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogs: any;
  newCategory = '';
  btnDisabled = false;
  filter: any;
  searchText = '';
  p: any;

  constructor(
    private data: DataService,
    private rest: RestApiService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const data = await this.rest.get(
        environment.apiHost + apiUrl['data-on-page-load']
      );
      if (data['success']) {
        this.blogs = data['blogs'];
      } else {
        this.data.error(data['message']);
      }
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  async onDelete(e) {
    try {
      const data = await this.rest.get(
        environment.apiHost + apiUrl['deleteTopic'] + '/' + e.target.id
      );
      if (data['success']) {
        this.blogs.forEach(function(v, i, arr) {
          if (v._id === data['blogId']) {
            arr.splice(i, 1);
          }
        });
      } else {
        this.data.error('Could not on-load data');
      }
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  onNavigate(e) {
    console.log(e);
    this.router.navigate([
      '/admin-panel/blog-edit-page',
      {
        id: e.target.id,
        title: e.target.getAttribute('title'),
        details: e.target.dataset.details
      }
    ]);
  }
}
