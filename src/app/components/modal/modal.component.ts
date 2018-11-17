import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { environment } from '../../../environments/environment';
import { network } from '../../api-call-list/api.call.list'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  blogs: any;

  @ViewChild('editBlog') editBlog: ElementRef;
  constructor(private data: DataService, private rest: RestApiService) { }

  ngOnInit() {
  }

  async onBlogSubmit() {

    console.log(this.editBlog.nativeElement.value);

    try {
      const data = await this.rest.get(environment.apiHost + network["new_topic"]);
      data['success'] ? (this.blogs = data) : this.data.error('Could not on-load data');
    } catch (error) {
      this.data.error(error['message']);
    }

  }

}
