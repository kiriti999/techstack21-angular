import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RestApiService } from '../../services/rest-api.service';
import { environment } from '../../../environments/environment';
import { apiUrl } from '../../api-call-list/api.call.list';
import { ModalService } from '../../shared-services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  blogs: any;

  @ViewChild('title') title: any;
  constructor(private data: DataService, private rest: RestApiService, private modal: ModalService) { }

  ngOnInit() {
  }

  async onSubmit() {
    try {
      const title = this.title.nativeElement.value;
      const data = await this.rest.post(environment.apiHost + apiUrl['createCategory'], { name: title });
      data['success'] ? (this.blogs = data) : this.data.error('Could not create category');
      this.modal.modalClose();
    } catch (error) {
      this.data.error(error['message']);
    }
  }
}
