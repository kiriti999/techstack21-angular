import { apiUrl } from './../../api-call-list/api.call.list';
import { Component, OnInit } from '@angular/core';
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
  newCategory = '';
  btnDisabled = false;
  filter: any;
  searchText: any = '';
  p: any;


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

  async onCreateConfirm(e) {
    console.log('create ', e);
    this._modalService.modalOpen(e);
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

  async onEditConfirm(e) {

  }

  async onDeleteConfirm(e) {
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
