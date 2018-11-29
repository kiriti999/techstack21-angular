import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { apiUrl } from './../../api-call-list/api.call.list';
import { environment } from '../../../environments/environment';
import { RestApiService } from '../../services/rest-api.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-edit-page',
  templateUrl: './blog-edit-page.component.html',
  styleUrls: ['./blog-edit-page.component.scss']
})
export class BlogEditPageComponent implements OnInit {
  id: any;
  title: any;
  details: any;
  editForm: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private data: DataService,
    private rest: RestApiService, private router: Router) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      details: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.editForm.setValue({ id: params.id, title: params.title, details: params.details });
      console.log('params', params);
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }

  async onEditSubmit(e) {
    console.log('this.editForm ', this.editForm.value);
    const url = {
      url: this.escapeHTML(this.editForm.value['title'].toLowerCase().split(' ').join('-'))
    }

    try {
      const data = await this.rest.post(environment.apiHost + apiUrl['update_topic_by_topicId'], this.editForm.value);
      data['success'] ?
        this.router.navigate(['/admin-panel/blogs']) : this.data.error('Could not edit form');
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  escape: HTMLTextAreaElement = document.createElement('textarea');
  escapeHTML(html) {
    this.escape.textContent = html;
    return this.escape.innerHTML;
  }

}
