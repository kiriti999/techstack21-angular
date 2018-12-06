import { apiUrl } from './../../api-call-list/api.call.list';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RestApiService } from '../../services/rest-api.service';
import { DataService } from '../../services/data.service';
import { ModalService } from '../../shared-services/modal.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any;
  isDisabled = true;
  searchText: any = '';
  newAttribute: any = {
    isNew:true,
    _id:'',
    name:''
  };

  constructor(
    private data: DataService,
    private rest: RestApiService,
    private _modalService: ModalService
  ) { }

  async ngOnInit() {
    try {
      const data = await this.rest.get(environment.apiHost + apiUrl.getCategoriesOnPageLoad);
      data['success'] ? (this.categories = data['categories']) : this.data.error(data['message']);
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

    // this._modalService.modalOpen(e);
    // this.categories.unshift(this.newAttribute);
    // this.newAttribute = {};
    // this._modalService.modalOpen(e);
    // let htmlTag = '<tr> <th scope="row">#</th> <td><input type="text"/></td> <td><input type="text"/></td> </tr>';
    // $('.table table-striped tbody').prepend(htmlTag);
    // e.confirm.resolve(e.newData);
    // try {
    //   const data = await this.rest.get(
    //     environment.apiHost + apiUrl.createCategory + '/' + e.newData.title);
    //   data['success'] ? this.data.success(data['message']) : this.data.error(data['message']);
    // } catch (error) {
    //   this.data.error(error['message']);
    // }
  }

  onCancel(e) {
    document.getElementById('addInput').style.display = 'block';
    document.getElementById('cancelCategory').style.display = 'none';
    document.getElementById('saveCategory').style.display = 'none';
    this.categories.shift(this.newAttribute);
    this.newAttribute = {};
  }

  async onSave(e) {
    document.getElementById('addInput').style.display = 'block';
    document.getElementById('cancelCategory').style.display = 'none';
    document.getElementById('saveCategory').style.display = 'none';
    console.log('save ', this.categories[0].name);
    if(this.categories[0].isNew && typeof this.categories[0].isNew !== 'undefined') {
       try {
        const data = await this.rest.get(environment.apiHost + apiUrl.createCategory + '/' + this.categories[0].name);
        if(data['success']) {
          console.log('success ', data['newCategory'])
          // (this.categories = data['categories'])
        } else {
          this.data.error(data['message']);
        }
      } catch (error) {
        this.data.error(error['message']);
      }
    }
  }

  async onEdit(e) {
    console.log('edit ', e);
    this._modalService.modalOpen(e);
  }

  async onDelete(e) {
    console.log('delete ', e);
    e.confirm.resolve(e.newData);
    try {
      console.log('trying...');
      const data = await this.rest.get(
        environment.apiHost + apiUrl.deleteCategory + '/' + e.newData._id);
        console.log('url ', data);
      data['success'] ? this.data.success(data['message']) : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }

}
