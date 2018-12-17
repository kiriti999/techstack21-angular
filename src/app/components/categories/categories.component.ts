import { apiUrl } from './../../api-call-list/api.call.list';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RestApiService } from '../../services/rest-api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any;
  isDisabled = true;
  isEdit = false;
  searchText: any = '';
  p: any;
  @ViewChild('categoryName') categoryName: ElementRef;
  newAttribute: any = {
    isNew: true,
    _id: '',
    name: ''
  };

  constructor(private data: DataService, private rest: RestApiService) {}

  async ngOnInit() {
    try {
      const data = await this.rest.get(
        environment.apiHost + apiUrl.getCategoriesOnPageLoad
      );
      data['success']
        ? (this.categories = data['categories'])
        : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  async onAddInput(e) {
    console.log('create ', e);
    this.isDisabled = false;
    this.categories.unshift(this.newAttribute);
    document.getElementById('addInput').style.display = 'none';
    document.getElementById('cancelCategory').style.display = 'block';
    document.getElementById('saveCategory').style.display = 'block';
  }

  onCancel(e) {
    document.getElementById('addInput').style.display = 'block';
    document.getElementById('cancelCategory').style.display = 'none';
    document.getElementById('saveCategory').style.display = 'none';
    this.categories.shift(this.newAttribute);
  }

  onCancelEdit(e) {
    this.isDisabled = true;
    this.isEdit = false;
  }

  async onSave(e) {
    document.getElementById('addInput').style.display = 'block';
    document.getElementById('cancelCategory').style.display = 'none';
    document.getElementById('saveCategory').style.display = 'none';
    if (
      this.categories[0].isNew &&
      typeof this.categories[0].isNew !== 'undefined'
    ) {
      try {
        const data = await this.rest.get(
          environment.apiHost +
            apiUrl.createCategory +
            '/' +
            this.categories[0].name
        );
        if (data['success']) {
          console.log('success ', data['newCategory']);
          this.categories.push(data['newCategory']);
        } else {
          this.data.error(data['message']);
        }
      } catch (error) {
        this.data.error(error['message']);
      } finally {
        this.categories.shift(this.newAttribute);
        this.newAttribute = {};
      }
    }
  }

  async onEdit(e) {
    console.log('edit ', e);
    this.isDisabled = false;
    this.isEdit = true;
  }

  async onEditSave(e) {
    console.log('e ', e.target.id);
    const categoryName = this.categoryName.nativeElement.value;

    try {
      const data = await this.rest.get(environment.apiHost + apiUrl.editCategory + '/' + e.target.id + '/' + categoryName);
      if (data['success']) {
        this.categories.forEach(function(v, i, arr) {
          if (v._id === data['updatedCategory']._id) {
            arr[i].name = data['updatedCategory'].name;
          }
        });
      } else {
        this.data.error(data['message']);
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    finally {
      this.isDisabled = true;
      this.newAttribute.isNew = false;
    }
  }

  async onDelete(e) {
    console.log('delete ', e);
    try {
      const data = await this.rest.get(
        environment.apiHost + apiUrl.deleteCategory + '/' + e.target.id
      );
      if (data['success']) {
        this.categories.forEach(function(v, i, arr) {
          if (v._id === data['deletedCategory']._id) {
            arr.splice(i, 1);
          }
        });
      } else {
        this.data.error(data['message']);
      }
    } catch (error) {
      this.data.error(error['message']);
    }
  }
}
