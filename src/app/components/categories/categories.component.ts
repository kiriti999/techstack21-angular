import { apiUrl } from './../../api-call-list/api.call.list';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  arrData: any[] = [
    {
      id: 1,
      name: 'Category 1',
    },
    {
      id: 2,
      name: 'Category 2',
    },

    {
      id: 11,
      name: 'Category 3',
    }
  ];

  constructor(
    private data: DataService,
    private rest: RestApiService,
  ) {
     // create the source
  }

  async ngOnInit() {
    try {
      const data = await this.rest.get(
        environment.apiHost + apiUrl.getCategoriesOnPageLoad
      );
      data['success'] ? (this.categories = data['categories']) : this.data.error(data['message']);
      this.source = new LocalDataSource(this.categories);
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
