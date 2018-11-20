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
  escape: HTMLTextAreaElement = document.createElement('textarea');

  @ViewChild('blogTitle') blogTitle: any;
  @ViewChild('blogDetails') blogDetails: ElementRef;
  constructor(private data: DataService, private rest: RestApiService, private modal: ModalService) { }

  ngOnInit() {
  }

  async onBlogSubmit() {

    try {
      const title = this.blogTitle.nativeElement.value;
      const details = this.blogDetails.nativeElement.value;
      const url = this.escapeHTML(this.blogTitle.nativeElement.value.toLowerCase().split(' ').join('-'));
      const data = await this.rest.post(
        environment.apiHost + apiUrl.new_topic,
        { title: title , details: details, url: url }
      );

      data['success'] ? (this.blogs = data) : this.data.error('Could not on-load data');
      this.modal.modalClose();
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  escapeHTML(html) {
      this.escape.textContent = html;
      return this.escape.innerHTML;
  }

}
