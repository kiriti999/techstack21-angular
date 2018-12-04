import { apiUrl } from './../../api-call-list/api.call.list';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RestApiService } from '../../services/rest-api.service';
import { DataService } from '../../services/data.service';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any;
  newCategory = '';
  btnDisabled = false;

  settings = {
    pager: {
      display: true,
      perPage: 5,
    },
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
      name: {
        title: 'Full Name',
        placeholder: 'Search by name'
      }
    }
  };

  source: LocalDataSource; // add a property to the component

  constructor(
    private data: DataService,
    private rest: RestApiService,
  ) { }

  async ngOnInit() {
    try {
      const data = await this.rest.get(environment.apiHost + apiUrl.getCategoriesOnPageLoad);
      data['success'] ? (this.categories = data['categories']) : this.data.error(data['message']);
      this.source = new LocalDataSource(this.categories);
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  async onCreateConfirm(e) {
    console.log('create ', e);
    e.confirm.resolve(e.newData);
    try {
      const data = await this.rest.get(
        environment.apiHost + apiUrl.createCategory + '/' + e.newData.name);
      data['success'] ? this.data.success(data['message']) : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  async onDeleteConfirm(e) {
    console.log('delete ', e);
    try {
      const data = await this.rest.get(environment.apiHost + apiUrl.deleteCategory + '/' + e.newData._id);
      data['success'] ? this.data.success(data['message']) : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
    e.confirm.resolve(e.newData);
  }

}
