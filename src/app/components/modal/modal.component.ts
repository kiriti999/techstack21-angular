import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { environment } from '../../../environments/environment';
import { apiUrl } from '../../api-call-list/api.call.list'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  blogs: any;

  @ViewChild('blogTitle') blogTitle: ElementRef;
  @ViewChild('blogDetails') blogDetails: ElementRef;
  constructor(private data: DataService, private rest: RestApiService) { }

  ngOnInit() {
  }

  async onBlogSubmit() {

    console.log(this.blogTitle.nativeElement.value);

    try {
      const data = await this.rest.post(environment.apiHost + apiUrl['new_topic'], { title: this.blogTitle, details: this.blogDetails });
      data['success'] ? (this.blogs = data) : this.data.error('Could not on-load data');
      // modal.querySelector('.modal-header h2').innerHTML = 'Edit blog';
    } catch (error) {
      this.data.error(error['message']);
    }

  }

}
