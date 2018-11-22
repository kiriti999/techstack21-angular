import { apiUrl } from './../../api-call-list/api.call.list';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RestApiService } from '../../services/rest-api.service';
import { DataService } from '../../services/data.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  blogs: any;
  newCategory = '';
  btnDisabled = false;

  settings = {
    delete: {
      confirmDelete: true,
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    columns: {
      _id: {
        title: 'ID',
        filter: false,
        editable: false
      },
      title: {
        title: 'blog title',
        searchFields: 'Search by title',
      },
      created_at: {
        title: 'created on'
      }
    },
    actions: {
      edit: false
    }
  };


  source: LocalDataSource; // add a property to the component

  constructor(
    private data: DataService,
    private rest: RestApiService,
  ) { }

  async ngOnInit() {
    try {
      const data = await this.rest.get(environment.apiHost + apiUrl["data-on-page-load"] + "/5/0");
      data['success'] ? (this.blogs = data['blogs']) : this.data.error(data['message']);
      this.source = new LocalDataSource(this.blogs);
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  async addCategory() {
    this.btnDisabled = true;
    try {
      const data = await this.rest.post(
        environment.apiHost + apiUrl.createCategory,
        { category: this.newCategory }
      );
      data['success']
        ? this.data.success(data['message'])
        : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

  onCreateConfirm(e) {
    console.log('create ', e);
    e.confirm.resolve(e.newData);
  }

}
