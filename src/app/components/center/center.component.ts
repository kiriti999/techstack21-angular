import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { DataService } from '../../services/data.service';
import { environment } from '../../../environments/environment';
import { apiUrl } from '../../api-call-list/api.call.list';
import { ModalService } from '../../shared-services/modal.service';
import { SharedService } from '../../shared-services/shared.service';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent implements OnInit {

  blogs: any;
  p: any;

  constructor(private data: DataService, private rest: RestApiService, private modal: ModalService, private _sharedService: SharedService) { }

  async ngOnInit() {
    try {
      const data = await this.rest.get(environment.apiHost + apiUrl["data-on-page-load"]);
      data['success']
        ? (this.blogs = data['blogs'])
        : this.data.error('Could not on-load data');
    } catch (error) {
      this.data.error(error['message']);
    }
    // this._sharedService.getBlogsByCategory().subscribe(blogs => this.blogs = blogs);
  }


  async onDelete(e) {
    try {
      const data = await this.rest.get(environment.apiHost + apiUrl["deleteTopic"] + "/" + e.target.id);
      if (data['success']) {
        this.blogs.forEach(function (v, i, arr) {
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

  /**
    Opens modal
    @param {event} event - Event passed from click
  */
  modalOpen(e) {
    this.modal.modalOpen(e);
  }

}
